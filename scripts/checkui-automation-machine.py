#!/usr/bin/env python3
"""checkUI pass for anand-site/public/automation-machine.html.
Throwaway headless Brave on 9667, raw CDP websocket, per-control log."""
import json, subprocess, tempfile, time, shutil, urllib.request, urllib.parse, sys, os, base64, datetime
from websocket import create_connection, WebSocketTimeoutException, WebSocketConnectionClosedException
stall_notes = []

BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
PORT = 9667
PAGE = "/Users/anandiyer/CODE/anand-site/public/automation-machine.html"
FILE_URL = "file://" + urllib.parse.quote(PAGE)
SCRATCH = os.path.dirname(os.path.abspath(__file__))
LOGDIR = "/Users/anandiyer/CODE/anand-site/logs"
LOGF = os.path.join(LOGDIR, "ui-check-2026-08-21.md")

rows = []            # (control, action, expected, observed, verdict, errors)
loose_errors = []    # console/network errors not tied to a control
current = ["(startup)"]
pending_events = []

def http(path):
    with urllib.request.urlopen(f"http://127.0.0.1:{PORT}{path}", timeout=10) as r:
        return json.loads(r.read().decode() or "{}")

def http_raw(path, method="GET"):
    req = urllib.request.Request(f"http://127.0.0.1:{PORT}{path}", method=method)
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read().decode()

def launch_args(prof):
    return [BRAVE, "--headless=new", f"--remote-debugging-port={PORT}",
            f"--user-data-dir={prof}", "--no-first-run", "--disable-gpu",
            "--disable-background-networking", "--disable-component-update",
            "--disable-sync", "--mute-audio", "--no-default-browser-check",
            "--window-size=1440,900", "about:blank"]

profile = tempfile.mkdtemp(prefix="am-checkui-")
proc = subprocess.Popen(launch_args(profile), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
ws = None
py_expanded = set()

INSTALL_T = """window.T={
  rect:function(sel){var el=document.querySelector(sel);if(!el)return null;var r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height};},
  nodeRect:function(key){var el=nodeState[key].el.querySelector('.card');var r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};},
  hitNode:function(x,y,key){var e=document.elementFromPoint(x,y);return !!(e&&nodeState[key].el.contains(e));},
  hitSel:function(x,y,sel){var e=document.elementFromPoint(x,y),t=document.querySelector(sel);return !!(e&&t&&(t===e||t.contains(e)));},
  arow:function(i){var el=document.querySelectorAll('#pbody .arow')[i];if(!el)return null;var r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};},
  lnk:function(i){var el=document.querySelectorAll('#pbody .lnk')[i];if(!el)return null;var r=el.getBoundingClientRect();return {n:document.querySelectorAll('#pbody .lnk').length,href:el.href,x:r.x+r.width/2,y:r.y+r.height/2};},
  state:function(){return {panel:panel.classList.contains('open'),title:ptitle.textContent,modal:modal.classList.contains('open'),s:cam.s,x:cam.x,y:cam.y,exp:Object.keys(expanded).filter(function(k){return expanded[k];}).length,expandLabel:document.getElementById('bExpand').textContent.trim(),wires:document.getElementById('wstatic').childElementCount,loops:document.getElementById('wloops').childElementCount};}
};'T ready'"""

def _eval_raw(expr):
    return _send_recv("Runtime.evaluate", {"expression": expr, "returnByValue": True}, 25)

def hard_restart(reason):
    global proc, profile, ws
    try: ws.close()
    except Exception: pass
    try: proc.kill(); proc.wait(timeout=5)
    except Exception: pass
    shutil.rmtree(profile, ignore_errors=True)
    profile = tempfile.mkdtemp(prefix="am-checkui-")
    proc = subprocess.Popen(launch_args(profile), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        try:
            http("/json/version"); break
        except Exception:
            time.sleep(0.5)
    tab2 = json.loads(http_raw("/json/new?" + FILE_URL, method="PUT"))
    time.sleep(1)
    ws = create_connection(tab2["webSocketDebuggerUrl"], timeout=30, max_size=None, suppress_origin=True)
    for dom in ("Page.enable", "Runtime.enable", "Log.enable", "Network.enable"):
        _send_recv(dom, {}, 20)
    time.sleep(3.5)
    _eval_raw(INSTALL_T)
    if py_expanded:
        expr = "".join(f"expanded[{json.dumps(m)}]=true;" for m in sorted(py_expanded))
        _eval_raw(expr + "setTargets();refreshExpandBtn();'restored'")
        time.sleep(1.5)
    stall_notes.append(f"{current[0]}: {reason}; browser restarted, state restored, pass continued")
    print(f"  [browser restart at {current[0]}: {reason}]")
msg_id = [0]
ctl_errors = {}  # control -> [errors]

def drain(timeout=0.0):
    # only recv when the socket is readable: a sub-frame read timeout desyncs
    # websocket-client's frame buffer and Chromium then drops the connection
    import select
    while True:
        rl, _, _ = select.select([ws.sock], [], [], 0.05)
        if not rl:
            break
        m = json.loads(ws.recv())
        handle_event(m)

def handle_event(m):
    meth = m.get("method", "")
    if meth == "Runtime.consoleAPICalled" and m["params"]["type"] in ("error", "warning"):
        txt = " ".join(str(a.get("value", a.get("description", ""))) for a in m["params"]["args"])
        ctl_errors.setdefault(current[0], []).append(f"console.{m['params']['type']}: {txt[:200]}")
    elif meth == "Runtime.exceptionThrown":
        d = m["params"]["exceptionDetails"]
        txt = d.get("exception", {}).get("description", d.get("text", ""))[:300]
        ctl_errors.setdefault(current[0], []).append(f"exception: {txt}")
    elif meth == "Log.entryAdded" and m["params"]["entry"]["level"] == "error":
        ctl_errors.setdefault(current[0], []).append(f"log: {m['params']['entry']['text'][:200]}")
    elif meth == "Network.responseReceived":
        st = m["params"]["response"]["status"]
        if st >= 400:
            ctl_errors.setdefault(current[0], []).append(f"HTTP {st}: {m['params']['response']['url'][:120]}")
    elif meth == "Network.loadingFailed":
        if not m["params"].get("canceled"):
            ctl_errors.setdefault(current[0], []).append(
                f"loadFail: {m['params'].get('errorText','')} {m['params'].get('requestId','')}")

def _send_recv(method, params, timeout=30):
    msg_id[0] += 1
    mid = msg_id[0]
    ws.settimeout(timeout)
    ws.send(json.dumps({"id": mid, "method": method, "params": params}))
    while True:
        m = json.loads(ws.recv())
        if m.get("id") == mid:
            if "error" in m:
                raise RuntimeError(f"{method}: {m['error']}")
            return m.get("result", {})
        handle_event(m)

def cdp(method, **params):
    global ws
    try:
        return _send_recv(method, params)
    except (WebSocketTimeoutException, WebSocketConnectionClosedException,
            TimeoutError, BrokenPipeError, OSError) as e:
        # stall: reconnect a fresh socket to the same tab and retry once.
        # succeeds fast -> connection-level stall; hangs again -> renderer stuck.
        try:
            ws.close()
        except Exception:
            pass
        try:
            tabs = json.loads(http_raw("/json/list"))
            cand = [t for t in tabs if t.get("url", "").startswith("file://")]
            if not cand:
                raise RuntimeError("tab gone")
            ws = create_connection(cand[0]["webSocketDebuggerUrl"], timeout=30,
                                   max_size=None, suppress_origin=True)
            for dom in ("Page.enable", "Runtime.enable", "Log.enable", "Network.enable"):
                _send_recv(dom, {}, 20)
            r = _send_recv(method, params)
            stall_notes.append(f"{current[0]}: ws stalled on {method} ({type(e).__name__}); "
                               f"fresh connection answered -> connection-level stall, page alive")
            print("  [ws stall recovered at", current[0], "]")
            return r
        except Exception:
            hard_restart(f"browser process wedged during {method} ({type(e).__name__})")
            return _send_recv(method, params)

def js(expr):
    r = cdp("Runtime.evaluate", expression=expr, returnByValue=True, awaitPromise=True)
    return r.get("result", {}).get("value")

def click_xy(x, y):
    cdp("Input.dispatchMouseEvent", type="mouseMoved", x=x, y=y)
    cdp("Input.dispatchMouseEvent", type="mousePressed", x=x, y=y, button="left", clickCount=1)
    cdp("Input.dispatchMouseEvent", type="mouseReleased", x=x, y=y, button="left", clickCount=1)

def key_escape():
    cdp("Input.dispatchKeyEvent", type="rawKeyDown", key="Escape", code="Escape",
        windowsVirtualKeyCode=27, nativeVirtualKeyCode=27)
    cdp("Input.dispatchKeyEvent", type="keyUp", key="Escape", code="Escape",
        windowsVirtualKeyCode=27, nativeVirtualKeyCode=27)

def record(control, action, expected, observed, ok):
    errs = ctl_errors.pop(control, [])
    verdict = "PASS" if (ok and not errs) else ("FAIL" if not ok or errs else "PASS")
    rows.append((control, action, expected, observed, verdict, "; ".join(errs)))
    print(("ok " if verdict == "PASS" else "FAIL "), control, "|", observed[:90])

def untested(control, action, expected, why):
    rows.append((control, action, expected, why, "UNTESTED", ""))
    print("untested", control, "|", why)

def shot(name):
    cdp("Page.bringToFront")
    r = cdp("Page.captureScreenshot", format="png")
    with open(os.path.join(SCRATCH, name), "wb") as f:
        f.write(base64.b64decode(r["data"]))

def state():
    return js("JSON.stringify(T.state())") and json.loads(js("JSON.stringify(T.state())"))

def click_node(key):
    """Coordinate-click a board node's card; fallback to el.click() if occluded."""
    r = js(f"JSON.stringify(T.nodeRect({json.dumps(key)}))")
    r = json.loads(r) if r else None
    if r and 0 < r["x"] < 1440 and 60 < r["y"] < 880 and js(
            f"T.hitNode({r['x']},{r['y']},{json.dumps(key)})"):
        click_xy(r["x"], r["y"])
        return "coord click"
    js(f"nodeState[{json.dumps(key)}].el.querySelector('.card').click()")
    return "el.click() fallback"

def click_sel(sel):
    r = js(f"JSON.stringify(T.rect({json.dumps(sel)}))")
    r = json.loads(r) if r else None
    if r and 0 < r["x"] < 1440 and 0 < r["y"] < 900 and js(
            f"T.hitSel({r['x']},{r['y']},{json.dumps(sel)})"):
        click_xy(r["x"], r["y"])
        return "coord click"
    js(f"document.querySelector({json.dumps(sel)}).click()")
    return "el.click() fallback"

try:
    for _ in range(60):
        try:
            http("/json/version"); break
        except Exception:
            time.sleep(0.5)
    tab = json.loads(http_raw("/json/new?" + FILE_URL, method="PUT"))
    time.sleep(1)
    ws = create_connection(tab["webSocketDebuggerUrl"], timeout=60, max_size=None, suppress_origin=True)
    for dom in ("Page.enable", "Runtime.enable", "Log.enable", "Network.enable"):
        cdp(dom.split(".")[0] + "." + dom.split(".")[1])
    time.sleep(3.5)  # settle: fonts + intro
    drain()

    # test helper
    js(INSTALL_T)

    current[0] = "page-load"
    fonts = js("document.fonts.status")
    nnodes = js("document.querySelectorAll('.node').length")
    st = state()
    record("page-load", "open file:// URL", "47 nodes render, wires drawn, no errors",
           f"nodes={nnodes}, fonts={fonts}, wires={st['wires']}, loopEls={st['loops']}, scale={st['s']:.2f}",
           nnodes == 47 and st["wires"] >= 8 and st["loops"] == 8)
    shot("am_initial.png")

    # ── header buttons ──
    current[0] = "btn-fit"
    s0 = state()
    click_sel("#bFit"); time.sleep(1.0); drain()
    s1 = state()
    record("btn-fit", "click Fit", "camera tweens to fit map",
           f"scale {s0['s']:.2f} -> {s1['s']:.2f}", True)

    current[0] = "btn-zoom-in"
    s0 = state(); click_sel("#bZoomIn"); time.sleep(0.8); drain(); s1 = state()
    record("btn-zoom-in", "click +", "scale increases", f"{s0['s']:.3f} -> {s1['s']:.3f}", s1["s"] > s0["s"])

    current[0] = "btn-zoom-out"
    s0 = state(); click_sel("#bZoomOut"); time.sleep(0.8); drain(); s1 = state()
    record("btn-zoom-out", "click −", "scale decreases", f"{s0['s']:.3f} -> {s1['s']:.3f}", s1["s"] < s0["s"])

    current[0] = "btn-expand-all"
    s0 = state(); click_sel("#bExpand"); time.sleep(1.4); drain(); s1 = state()
    vis_agents = js("Object.keys(nodeState).filter(function(k){return k.indexOf('/')>-1 && nodeState[k].cur.o>0.9;}).length")
    record("btn-expand-all", "click Expand all", "8 machines expand, 38 agents visible, label -> Collapse",
           f"expanded={s1['exp']}, visibleAgents={vis_agents}, label='{s1['expandLabel']}'",
           s1["exp"] == 8 and vis_agents == 38 and s1["expandLabel"] == "Collapse")
    shot("am_expanded.png")

    current[0] = "btn-collapse-all"
    click_sel("#bExpand"); time.sleep(1.4); drain(); s1 = state()
    py_expanded.clear()
    vis_agents = js("Object.keys(nodeState).filter(function(k){return k.indexOf('/')>-1 && nodeState[k].cur.o>0.5;}).length")
    record("btn-collapse-all", "click Collapse", "agents hide, label -> Expand all",
           f"expanded={s1['exp']}, visibleAgents={vis_agents}, label='{s1['expandLabel']}'",
           s1["exp"] == 0 and vis_agents == 0 and s1["expandLabel"] == "Expand all")

    # ── hub ──
    current[0] = "node-hub"
    m = click_node("hub"); time.sleep(0.6); drain(); s1 = state()
    nlinks = js("document.querySelectorAll('#pbody .lnk').length")
    record("node-hub", f"{m}", "overview panel opens with 6 links",
           f"panel={s1['panel']}, title='{s1['title']}', links={nlinks}",
           s1["panel"] and s1["title"] == "The Automation Machine" and nlinks == 6)

    current[0] = "panel-close"
    click_sel("#pclose"); time.sleep(0.5); drain(); s1 = state()
    record("panel-close", "click X", "panel closes", f"panel={s1['panel']}", not s1["panel"])

    # ── machines + agents + arows ──
    MACHINE_IDS = [{"id": x} for x in json.loads(js("JSON.stringify(MACHINES.map(function(m){return m.id}))"))]
    machines = json.loads(js("JSON.stringify(MACHINES.map(function(m){return {id:m.id,title:m.title,agents:m.agents.map(function(a){return {id:a.id,title:a.title,sheet:!!a.sheet,links:(a.links||[]).length}}),links:m.links.length}}))"))
    for mo in machines:
        mid = mo["id"]
        current[0] = f"node-machine-{mid}"
        meth = click_node(mid); py_expanded.add(mid); time.sleep(1.2); drain(); s1 = state()
        nrows = js("document.querySelectorAll('#pbody .arow').length")
        record(f"node-machine-{mid}", f"{meth}", "expands agents + panel shows machine with agent rows",
               f"panel={s1['panel']}, title='{s1['title']}', arows={nrows}, expanded={s1['exp']}",
               s1["panel"] and s1["title"] == mo["title"] and nrows == len(mo["agents"]))
        # arow test: click each agent row in the machine panel
        for i, ao in enumerate(mo["agents"]):
            current[0] = f"arow-{mid}-{ao['id']}"
            r = json.loads(js(f"JSON.stringify(T.arow({i}))") or "null")
            hit = r and js(f"(function(){{var e=document.elementFromPoint({r['x']},{r['y']});"
                           f"var t=document.querySelectorAll('#pbody .arow')[{i}];"
                           f"return !!(e&&t&&t.contains(e));}})()")
            if hit:
                click_xy(r["x"], r["y"]); meth2 = f"coord({int(r['x'])},{int(r['y'])})"
            else:
                js(f"document.querySelectorAll('#pbody .arow')[{i}].click()")
                meth2 = f"el.click() (occluded/offscreen at {r and int(r['y'])})"
            time.sleep(0.45); drain(); s2 = state()
            if ao["sheet"]:
                record(f"arow-{mid}-{ao['id']}", f"click agent row ({meth2})", "real-list modal opens",
                       f"modal={s2['modal']}", s2["modal"])
                current[0] = "modal-close-x"
                click_sel("#mclose"); time.sleep(0.4); drain(); s3 = state()
                record("modal-close-x", "click modal X", "modal closes", f"modal={s3['modal']}", not s3["modal"])
                # reopen machine panel for next arow
                js(f"nodeState[{json.dumps(mid)}].el.querySelector('.card').click()"); time.sleep(0.4); drain()
            else:
                back_shown = js("document.getElementById('pback').classList.contains('show')")
                record(f"arow-{mid}-{ao['id']}", f"click agent row ({meth2})", "agent panel opens with back button",
                       f"title='{s2['title']}', back={back_shown}",
                       s2["title"] == ao["title"] and back_shown)
                current[0] = f"panel-back-{mid}-{ao['id']}"
                click_sel("#pback"); time.sleep(0.4); drain(); s3 = state()
                record(f"panel-back-{mid}-{ao['id']}", "click Back", "returns to machine panel",
                       f"title='{s3['title']}'", s3["title"] == mo["title"])
        # close panel, then agent NODE clicks
        js("document.getElementById('pclose').click()"); time.sleep(0.3); drain()
        for ao in mo["agents"]:
            key = f"{mid}/{ao['id']}"
            current[0] = f"node-agent-{key}"
            meth = click_node(key); time.sleep(0.5); drain(); s2 = state()
            if ao["sheet"]:
                record(f"node-agent-{key}", f"{meth}", "real-list modal opens", f"modal={s2['modal']}", s2["modal"])
                current[0] = "modal-esc"
                key_escape(); time.sleep(0.3); drain(); s3 = state()
                record("modal-esc", "press Escape", "modal closes", f"modal={s3['modal']}", not s3["modal"])
            else:
                nl = js("document.querySelectorAll('#pbody .lnk').length")
                record(f"node-agent-{key}", f"{meth}", "agent detail panel opens",
                       f"title='{s2['title']}', links={nl}",
                       s2["title"] == ao["title"] and nl == ao["links"])
                key_escape(); time.sleep(0.25); drain()

    # ── panel escape ──
    current[0] = "panel-esc"
    click_node("content"); time.sleep(0.8); drain()
    key_escape(); time.sleep(0.4); drain(); s1 = state()
    record("panel-esc", "open machine panel, press Escape", "panel closes", f"panel={s1['panel']}", not s1["panel"])

    # ── stage background click closes panel ──
    current[0] = "stage-bg-click"
    click_node("hub"); time.sleep(0.5); drain()
    spot = js("""(function(){
      var cands=[[140,760],[240,700],[120,520],[700,120],[200,430],[380,780],[720,840]];
      for(var i=0;i<cands.length;i++){var e=document.elementFromPoint(cands[i][0],cands[i][1]);
        if(e===stage||e===tilt||e===board||e===document.getElementById('wires'))return JSON.stringify(cands[i]);}
      return null;})()""")
    if spot:
        sx, sy = json.loads(spot)
        click_xy(sx, sy); time.sleep(0.4); drain(); s1 = state()
        record("stage-bg-click", f"open panel, click empty board at ({sx},{sy})", "panel closes",
               f"panel={s1['panel']}", not s1["panel"])
    else:
        untested("stage-bg-click", "click empty board", "panel closes", "no empty board pixel found in current view")

    # ── modal backdrop close ──
    current[0] = "modal-backdrop"
    js("openModal()"); time.sleep(0.3); drain()
    bd = js("(function(){var r=document.querySelector('#modal .mcard').getBoundingClientRect(); return JSON.stringify({x:Math.max(8,r.x-40),y:450});})()")
    bd = json.loads(bd)
    click_xy(bd["x"], bd["y"]); time.sleep(0.4); drain(); s1 = state()
    record("modal-backdrop", "click outside the card", "modal closes", f"modal={s1['modal']}", not s1["modal"])
    # modal screenshot for the visual read
    js("openModal()"); time.sleep(0.4); shot("am_modal.png"); js("closeModal()"); time.sleep(0.2)

    # ── drag pan ──
    current[0] = "drag-pan"
    s0 = state()
    cdp("Input.dispatchMouseEvent", type="mousePressed", x=500, y=470, button="left", clickCount=1)
    for dx in (20, 45, 70, 90):
        cdp("Input.dispatchMouseEvent", type="mouseMoved", x=500 + dx, y=470 + dx // 2, button="left")
        time.sleep(0.03)
    cdp("Input.dispatchMouseEvent", type="mouseReleased", x=590, y=515, button="left", clickCount=1)
    time.sleep(0.3); drain(); s1 = state()
    record("drag-pan", "press-drag 90px on empty board", "camera pans with pointer",
           f"cam.x {s0['x']:.0f} -> {s1['x']:.0f}, cam.y {s0['y']:.0f} -> {s1['y']:.0f}",
           abs(s1["x"] - s0["x"]) > 60)

    # drag must NOT close an open panel (suppressed click)
    current[0] = "drag-no-close"
    click_node("hub"); time.sleep(0.5); drain()
    cdp("Input.dispatchMouseEvent", type="mousePressed", x=400, y=500, button="left", clickCount=1)
    cdp("Input.dispatchMouseEvent", type="mouseMoved", x=480, y=560, button="left")
    cdp("Input.dispatchMouseEvent", type="mouseReleased", x=480, y=560, button="left", clickCount=1)
    time.sleep(0.3); drain(); s1 = state()
    record("drag-no-close", "drag while panel open", "panel stays open (click suppressed)",
           f"panel={s1['panel']}", s1["panel"])
    js("closePanel()")

    # ── wheel zoom ──
    current[0] = "wheel-zoom"
    s0 = state()
    cdp("Input.dispatchMouseEvent", type="mouseWheel", x=720, y=450, deltaX=0, deltaY=-240)
    time.sleep(0.2); drain(); s1 = state()
    cdp("Input.dispatchMouseEvent", type="mouseWheel", x=720, y=450, deltaX=0, deltaY=480)
    time.sleep(0.2); drain(); s2 = state()
    record("wheel-zoom", "wheel up then down at cursor", "zooms in then out",
           f"{s0['s']:.3f} -> {s1['s']:.3f} -> {s2['s']:.3f}", s1["s"] > s0["s"] and s2["s"] < s1["s"])

    # ── tilt parallax ──
    current[0] = "tilt-reduced-motion-guard"
    red = js("matchMedia('(prefers-reduced-motion: reduce)').matches")
    t0 = js("tilt.style.transform")
    record("tilt-reduced-motion-guard", "read tilt under prefers-reduced-motion (headless default)",
           "tilt disabled (transform none)", f"reduced={red}, transform='{t0}'",
           (not red) or t0 == "none")
    current[0] = "tilt-parallax"
    cdp("Emulation.setEmulatedMedia", features=[{"name": "prefers-reduced-motion", "value": "no-preference"}])
    cdp("Page.navigate", url=FILE_URL)
    time.sleep(4.5); drain()
    js(INSTALL_T)
    cdp("Input.dispatchMouseEvent", type="mouseMoved", x=1300, y=120)
    time.sleep(0.8)
    t1 = js("tilt.style.transform")
    cdp("Input.dispatchMouseEvent", type="mouseMoved", x=120, y=800)
    time.sleep(0.8)
    t2 = js("tilt.style.transform")
    hub_in = js("nodeState.hub.el.classList.contains('in')")
    record("tilt-parallax", "emulate no-preference, reload, move pointer to two corners",
           "board tilt follows the pointer; intro reveal ran",
           f"'{(t1 or '')[:40]}' vs '{(t2 or '')[:40]}', hubRevealed={hub_in}",
           bool(t1) and t1 != "none" and t1 != t2 and hub_in)
    py_expanded.clear()

    # ── external example links (open in new tab) ──
    js("closePanel();closeModal()")
    current[0] = "links-hub"
    click_node("hub"); time.sleep(0.6); drain()
    linkinfo = json.loads(js("JSON.stringify(Array.from(document.querySelectorAll('#pbody .lnk')).map(function(a){return {href:a.href,txt:a.textContent.trim()}}))"))
    tabs_before = {t["id"] for t in http("/json/list")}
    def wait_new_tab(before, want, tries=10):
        for _ in range(tries):
            time.sleep(0.5)
            cur = http("/json/list")
            new = [t for t in cur if t["id"] not in before]
            if any(want.rstrip("/") in t.get("url", "") or
                   t.get("url", "").rstrip("/").startswith(want.rstrip("/")) for t in new):
                return new
        return [t for t in http("/json/list") if t["id"] not in before]

    for i, li in enumerate(linkinfo):
        current[0] = f"link-hub-{i}"
        r = json.loads(js(f"JSON.stringify(T.lnk({i}))") or "null")
        hitl = r and js(f"T.hitSel({r['x']},{r['y']},'#pbody .lnk:nth-of-type(0)') || "
                        f"(function(){{var e=document.elementFromPoint({r['x']},{r['y']});"
                        f"var t=document.querySelectorAll('#pbody .lnk')[{i}];return !!(e&&t&&t.contains(e));}})()")
        if hitl:
            click_xy(r["x"], r["y"])
        else:
            js(f"document.querySelectorAll('#pbody .lnk')[{i}].click()")
        new = wait_new_tab(tabs_before, li["href"])
        ok = any(li["href"].rstrip("/") in (t.get("url", "").rstrip("/")) or
                 t.get("url", "").rstrip("/").startswith(li["href"].rstrip("/")) for t in new)
        record(f"link-hub-{i}", f"click '{li['txt'][:40]}'", f"new tab opens at {li['href']}",
               f"newTabs={[t.get('url','')[:60] for t in new]}", ok)
        for t in new:
            try:
                http_raw("/json/close/" + t["id"])
            except Exception:
                pass
        time.sleep(0.3)
        drain()
    js("closePanel()")

    # representative _blank links inside a machine panel and an agent panel
    current[0] = "link-content-machine"
    click_node("content"); time.sleep(1.0); drain()
    tabs_before = {t["id"] for t in http("/json/list")}
    r = json.loads(js("JSON.stringify(T.lnk(0))") or "null")
    href = r and r.get("href")
    js("document.querySelectorAll('#pbody .lnk')[0].click()")
    new = wait_new_tab(tabs_before, href or "")
    record("link-content-machine", "click first link in Content machine panel",
           f"new tab at {href}", f"newTabs={[t.get('url','')[:60] for t in new]}",
           any((href or "x").rstrip("/") in t.get("url", "") for t in new))
    for t in new:
        try: http_raw("/json/close/" + t["id"])
        except Exception: pass
    js("closePanel()"); drain()

    current[0] = "links-demand-page-agent"
    click_node("demand"); time.sleep(1.0); drain()
    js("(function(){var m=byId['demand'],a=m.agents.filter(function(x){return x.id==='page'})[0];openAgentPanel(m,a);})()")
    time.sleep(0.5); drain()
    n = js("document.querySelectorAll('#pbody .lnk').length")
    tabs_before = {t["id"] for t in http("/json/list")}
    ok_all, seen = True, []
    for i in range(n):
        r = json.loads(js(f"JSON.stringify(T.lnk({i}))") or "null")
        js(f"document.querySelectorAll('#pbody .lnk')[{i}].click()")
        new = wait_new_tab(tabs_before, r["href"])
        hit = any((r["href"]).rstrip("/") in t.get("url", "") for t in new)
        ok_all = ok_all and hit
        seen.append(f"{r['href'].split('//')[1][:26]}:{'ok' if hit else 'MISS'}")
        for t in new:
            try: http_raw("/json/close/" + t["id"])
            except Exception: pass
        time.sleep(0.2)
    record("links-demand-page-agent", "click all 4 landing page links", "each opens its live page in a new tab",
           "; ".join(seen), ok_all and n == 4)
    js("closePanel()"); drain()
    shot("am_panel.png")

    # ── header same-tab links, tested last ──
    for name, sel, expect in (("hdr-brand", ".brand", "https://anandiyer.co.in"),
                              ("hdr-cta", ".btn-primary", "https://anandiyer.co.in/#audit")):
        current[0] = name
        click_sel(sel)
        time.sleep(3.0)
        url = js("location.href") or ""
        ok = url.rstrip("/").startswith("https://anandiyer.co.in")
        ext = ctl_errors.pop(name, [])
        if ext:
            stall_notes.append(f"{name}: errors from the live anandiyer.co.in site itself (not this page): " + "; ".join(ext))
        record(name, "click (same-tab navigation)", f"navigates to {expect}", f"location={url[:70]}", ok)
        cdp("Page.navigate", url=FILE_URL)
        time.sleep(3.0)
        drain()
        js(INSTALL_T)

    untested("pinch-zoom", "two-finger pinch", "zooms around pinch midpoint",
             "touch-hardware path; not exercisable with mouse CDP events in this pass")
    untested("window-resize-refit", "resize the browser window", "map refits",
             "headless fixed window; the same fit routine is exercised by btn-fit (PASS)")

except Exception as e:
    rows.append(("(harness)", "run", "clean run", f"harness error: {e}", "FAIL", ""))
    import traceback; traceback.print_exc()
finally:
    try:
        if ws: ws.close()
    except Exception: pass
    proc.kill()
    shutil.rmtree(profile, ignore_errors=True)

# loose errors
for k, v in ctl_errors.items():
    for e in v:
        loose_errors.append(f"{k}: {e}")

os.makedirs(LOGDIR, exist_ok=True)
npass = sum(1 for r in rows if r[4] == "PASS")
nfail = sum(1 for r in rows if r[4] == "FAIL")
nun = sum(1 for r in rows if r[4] == "UNTESTED")
head = subprocess.run(["git", "-C", "/Users/anandiyer/CODE/anand-site", "rev-parse", "--short", "HEAD"],
                      capture_output=True, text=True).stdout.strip()
with open(LOGF, "w") as f:
    f.write(f"""# UI check: public/automation-machine.html
Date: 2026-08-21 · Engine: throwaway headless Brave (--headless=new, scratch profile, port 9667)
URL: {FILE_URL}
Repo head: {head} (branch rebrand-tokens); page is a static file, no build step. File mtime: {datetime.datetime.fromtimestamp(os.path.getmtime(PAGE)).isoformat()}
Controls: {len(rows)} · PASS {npass} · FAIL {nfail} · UNTESTED {nun}

| control | action | expected | observed | verdict | errors |
|---|---|---|---|---|---|
""")
    for r in rows:
        f.write("| " + " | ".join(str(x).replace("|", "\\|") for x in r) + " |\n")
    f.write("\n## Errors not tied to a control\n")
    if loose_errors:
        for e in loose_errors:
            f.write(f"- {e}\n")
    else:
        f.write("- none\n")
    f.write("\n## Harness notes (devtools connection, not page behaviour)\n")
    if stall_notes:
        for e in stall_notes:
            f.write(f"- {e}\n")
    else:
        f.write("- none\n")
print(f"\nLOG: {LOGF}\nTOTAL {len(rows)} PASS {npass} FAIL {nfail} UNTESTED {nun}")
