(function () {
  /* ---------- Skill data (edit here to update the board) ---------- */
  var PARTS = {
    db: {
      ref: "U1", tab: "Databases", title: "Databases & data",
      desc: "Designing and maintaining client databases and keeping data accurate through validation. It sits at the centre of the board because most of my work connects to it.",
      skills: ["Database administration", "Relational databases", "SQL", "Data validation"],
      used: [["Freelance IT Specialist", "#exp-freelance"], ["Sorosoro Ibaba Development Cooperative", "#exp-sorosoro"], ["ProTomo", "#projects"]]
    },
    web: {
      ref: "J1", tab: "Websites", title: "Website design",
      desc: "Designing, deploying and maintaining responsive websites for clients: the connector between a business and the people looking for it.",
      skills: ["Responsive website design", "HTML", "CSS", "Git", "GitHub"],
      used: [["Freelance IT Specialist", "#exp-freelance"]]
    },
    hw: {
      ref: "R1", tab: "Hardware", title: "Hardware diagnostics & repair",
      desc: "Diagnosing hardware, OS and software faults, then fixing them, from component upgrades down to PCB repair and soldering.",
      skills: ["Hardware diagnostics", "OS troubleshooting", "Component upgrades", "PCB repair", "Soldering"],
      used: [["Freelance IT Specialist", "#exp-freelance"]]
    },
    qa: {
      ref: "TP1", tab: "Testing", title: "QA & testing",
      desc: "Finding what is broken, in game builds and in business processes, and writing it up with clear steps so someone can fix it.",
      skills: ["Functional testing", "Regression testing", "Exploratory testing", "Bug reporting", "Data validation", "Process documentation", "SOP updates"],
      used: [["IGG Games", "#exp-igg"], ["Sorosoro Ibaba Development Cooperative", "#exp-sorosoro"], ["ProTomo", "#projects"]]
    },
    code: {
      ref: "U2", tab: "Code", title: "Programming",
      desc: "From high-level languages down to assembly, used across my thesis and team projects.",
      skills: ["Java", "C++", "Kotlin", "Python", "Assembly", "SQL", "Git"],
      used: [["Prototype Hybrid Scheduler", "#proj-thesis"], ["Team projects", "#projects"]]
    },
    media: {
      ref: "Y1", tab: "Media", title: "Media & office tools",
      desc: "Editing images and video, making visuals for team projects, and formatting documents so they read cleanly.",
      skills: ["Photoshop", "Premiere Pro", "After Effects", "Canva", "MS Office"],
      used: [["Freelance IT Specialist", "#exp-freelance"], ["Team projects (artist)", "#projects"]]
    }
  };
  var ORDER = ["db", "web", "hw", "qa", "code", "media"];
  var NS = "http://www.w3.org/2000/svg";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Draw chip pins ---------- */
  function rect(parent, x, y, w, h, cls) {
    var r = document.createElementNS(NS, "rect");
    r.setAttribute("x", x); r.setAttribute("y", y);
    r.setAttribute("width", w); r.setAttribute("height", h);
    r.setAttribute("class", cls);
    parent.appendChild(r);
  }
  var u1 = document.getElementById("u1pins");
  for (var i = 0; i < 10; i++) {
    var p = 262 + i * 12.4, s = 170 + i * 12.4;
    rect(u1, p, 150, 5, 12, "pin"); rect(u1, p, 298, 5, 12, "pin");
    rect(u1, 240, s, 12, 5, "pin"); rect(u1, 388, s, 12, 5, "pin");
  }
  var u2 = document.getElementById("u2pins");
  for (var j = 0; j < 7; j++) {
    var q = 478 + j * 12.5;
    rect(u2, q, 86, 5, 12, "pin"); rect(u2, q, 152, 5, 12, "pin");
  }
  var j1 = document.getElementById("j1pins");
  for (var k = 0; k < 5; k++) {
    [56, 78].forEach(function (cx) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", cx); c.setAttribute("cy", 194 + k * 20); c.setAttribute("r", 6);
      c.setAttribute("class", "pad");
      j1.appendChild(c);
    });
  }

  /* ---------- Board selection (deep link: #skills-hw etc.) ---------- */
  var tabs = document.getElementById("partTabs");
  ORDER.forEach(function (id) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.part = id;
    b.innerHTML = "<b>" + PARTS[id].ref + "</b>" + PARTS[id].tab;
    b.addEventListener("click", function () { select(id, true); });
    li.appendChild(b);
    tabs.appendChild(li);
  });
  document.querySelectorAll(".part").forEach(function (g) {
    g.addEventListener("click", function () { select(g.dataset.part, true); });
  });

  function select(id, push) {
    var d = PARTS[id];
    if (!d) return;
    document.getElementById("pRef").textContent = d.ref;
    document.getElementById("pTitle").textContent = d.title;
    document.getElementById("pDesc").textContent = d.desc;
    var ul = document.getElementById("pSkills");
    ul.innerHTML = "";
    d.skills.forEach(function (s) { var li = document.createElement("li"); li.textContent = s; ul.appendChild(li); });
    var used = document.getElementById("pUsed");
    used.innerHTML = "";
    d.used.forEach(function (u, n) {
      if (n) used.appendChild(document.createTextNode(", "));
      var a = document.createElement("a");
      a.href = u[1]; a.textContent = u[0];
      a.addEventListener("click", function () { flash(u[1]); });
      used.appendChild(a);
    });
    document.querySelectorAll(".part").forEach(function (g) { g.classList.toggle("is-on", g.dataset.part === id); });
    document.querySelectorAll(".trace[data-for]").forEach(function (t) { t.classList.toggle("live", id === "db" || t.dataset.for === id); });
    tabs.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.part === id ? "true" : "false"); });
    if (push && history.replaceState) history.replaceState(null, "", "#skills-" + id);
  }
  function flash(hash) {
    var el = document.querySelector(hash);
    if (!el) return;
    var det = el.querySelector("details");
    if (det) det.open = true;
    el.classList.add("flash");
    setTimeout(function () { el.classList.remove("flash"); }, 1600);
  }
  var m = location.hash.match(/^#skills-(\w+)$/);
  select(m && PARTS[m[1]] ? m[1] : "db", false);
  if (m) document.getElementById("skills").scrollIntoView();

  /* ---------- Scheduler demo ---------- */
  var TASKS = [["P1", 6, "#0E5A43"], ["P2", 3, "#C47F38"], ["P3", 8, "#3B6E8F"], ["P4", 2, "#7A4E8A"]];
  var ALGOS = [["fcfs", "First come, first served"], ["sjf", "Shortest job first"], ["rr", "Round robin (slice of 2)"]];
  var algo = "fcfs";
  var inputs = document.getElementById("schedInputs");
  TASKS.forEach(function (t, n) {
    var l = document.createElement("label");
    l.innerHTML = '<i style="background:' + t[2] + '"></i>' + t[0] +
      ' <input type="number" min="1" max="12" value="' + t[1] + '" aria-label="' + t[0] + ' run time">';
    l.querySelector("input").addEventListener("input", function (e) {
      var v = Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1));
      TASKS[n][1] = v; run();
    });
    inputs.appendChild(l);
  });
  var algoBox = document.getElementById("schedAlgos");
  ALGOS.forEach(function (a) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = a[1]; b.dataset.algo = a[0];
    b.addEventListener("click", function () { algo = a[0]; run(); });
    algoBox.appendChild(b);
  });

  function schedule() {
    var order = TASKS.map(function (t, n) { return { n: n, left: t[1] }; });
    var slices = [], time = 0, finish = {};
    if (algo === "sjf") order.sort(function (a, b) { return a.left - b.left || a.n - b.n; });
    if (algo === "rr") {
      var queue = order.slice();
      while (queue.length) {
        var c = queue.shift(), run = Math.min(2, c.left);
        slices.push([c.n, time, run]); time += run; c.left -= run;
        if (c.left > 0) queue.push(c); else finish[c.n] = time;
      }
    } else {
      order.forEach(function (c) { slices.push([c.n, time, c.left]); time += c.left; finish[c.n] = time; });
    }
    var wait = TASKS.reduce(function (sum, t, n) { return sum + finish[n] - t[1]; }, 0) / TASKS.length;
    return { slices: slices, total: time, wait: wait };
  }
  function run() {
    algoBox.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.algo === algo ? "true" : "false"); });
    var r = schedule();
    var g = document.getElementById("gantt"), ax = document.getElementById("ganttAxis");
    g.innerHTML = ""; ax.innerHTML = "";
    r.slices.forEach(function (s, n) {
      var d = document.createElement("div");
      d.style.width = (s[2] / r.total * 100) + "%";
      d.style.background = TASKS[s[0]][2];
      if (!reduce) d.style.animationDelay = (n * 0.05) + "s";
      d.textContent = TASKS[s[0]][0];
      d.title = TASKS[s[0]][0] + ": runs " + s[1] + " to " + (s[1] + s[2]);
      g.appendChild(d);
      var t = document.createElement("span");
      t.style.left = (s[1] / r.total * 100) + "%"; t.textContent = s[1];
      ax.appendChild(t);
    });
    var end = document.createElement("span");
    end.style.left = "100%"; end.textContent = r.total; ax.appendChild(end);
    document.getElementById("schedResult").textContent =
      "Average waiting time: " + r.wait.toFixed(2) + " time units";
  }
  run();

  /* ---------- Project filter ---------- */
  var FILTERS = ["All", "Python", "App", "Game", "Systems", "QA"];
  var fBox = document.getElementById("projFilter");
  var items = document.querySelectorAll("#projList li");
  FILTERS.forEach(function (f, n) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = f;
    b.setAttribute("aria-pressed", n === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      fBox.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      items.forEach(function (li) { li.hidden = f !== "All" && li.dataset.tags.split(" ").indexOf(f) < 0; });
    });
    fBox.appendChild(b);
  });

  /* ---------- Greeting languages ---------- */
  var GREET = [
    ["English", "en", "Hello! Let's work together."],
    ["Filipino", "fil", "Kumusta! Tara, magtrabaho tayo nang sama-sama."],
    ["Russian", "ru", "Здравствуйте! Давайте работать вместе."]
  ];
  var greet = document.getElementById("greet");
  var langBtns = document.getElementById("langBtns");
  GREET.forEach(function (g, n) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = g[0];
    b.setAttribute("aria-pressed", n === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      greet.textContent = g[2]; greet.lang = g[1];
      langBtns.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    });
    langBtns.appendChild(b);
  });

  /* ---------- Email (used by the message form) ---------- */
  var email = document.getElementById("email").textContent;

  /* ---------- Message form (opens the visitor's email app) ---------- */
  document.getElementById("msgForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("fName").value.trim();
    var msg = document.getElementById("fMsg").value.trim();
    location.href = "mailto:" + email + "?subject=" + encodeURIComponent("Portfolio enquiry from " + name) +
      "&body=" + encodeURIComponent(msg + "\n\n" + name);
    document.getElementById("formNote").textContent = "Your email app should now be open with the message ready.";
  });

  /* ---------- Sticky header, progress bar, active nav ---------- */
  var head = document.getElementById("siteHead"), bar = document.getElementById("progress");
  function onScroll() {
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + "%";
    head.classList.toggle("scrolled", h.scrollTop > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  var navLinks = document.querySelectorAll(".nav a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["skills", "experience", "projects", "education", "contact"].forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement, themeBtn = document.getElementById("themeBtn");
  function isDark() { var t = root.getAttribute("data-theme"); return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function label() { themeBtn.textContent = isDark() ? "Light mode" : "Dark mode"; }
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  label();
  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
