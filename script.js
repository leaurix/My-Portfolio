(function () {
  /* ---------- Skill data (edit here to update the board) ---------- */
  var PARTS = {
    db: {
      ref: "U1", tab: "Databases", title: "Database administration",
      desc: "Organising, updating and maintaining client databases, with validation checks that keep the data accurate. It sits at the centre of the board because most of my work connects to it.",
      skills: ["Database administration", "Data organisation", "Data validation", "Basic maintenance"],
      used: [["Freelance IT Specialist", "#exp-freelance"], ["AG&P work immersion", "#exp-agp"]]
    },
    web: {
      ref: "J1", tab: "Websites", title: "Website design",
      desc: "Designing websites for freelance clients: the connector between a business and the people looking for it.",
      skills: ["Website design", "GitHub", "Adobe Photoshop", "Canva"],
      used: [["Freelance IT Specialist", "#exp-freelance"]]
    },
    hw: {
      ref: "R1", tab: "Hardware", title: "Hardware repair",
      desc: "Diagnosing faulty system units and peripherals, then fixing them, down to replacing PCBs and soldering internal components.",
      skills: ["Hardware troubleshooting", "PCB & internal parts replacement", "Soldering", "PC upgrades"],
      used: [["Freelance IT Specialist", "#exp-freelance"]]
    },
    qa: {
      ref: "TP1", tab: "Testing", title: "Quality assurance & testing",
      desc: "Finding what is broken, in game builds and in business processes, and writing it up so someone can fix it.",
      skills: ["Functional testing", "Regression testing", "Exploratory testing", "Bug tracking", "Data validation", "Process documentation", "SOP updates"],
      used: [["IGG Games", "#exp-igg"], ["Sorosoro Ibaba Development Cooperative", "#exp-sorosoro"]]
    },
    code: {
      ref: "U2", tab: "Code", title: "Programming",
      desc: "Programming foundations from my Computer Science degree, from high-level languages down to assembly.",
      skills: ["Java", "C++", "Kotlin", "Assembly", "GitHub"],
      used: [["BS Computer Science, Batangas State University", "#edu-bsu"]]
    },
    media: {
      ref: "Y1", tab: "Media", title: "Media & office tools",
      desc: "Editing images and video, building visuals, and formatting documents so they read cleanly.",
      skills: ["Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects", "Canva", "Microsoft Office", "Formatting & reformatting"],
      used: [["Freelance IT Specialist", "#exp-freelance"], ["Sorosoro Ibaba Development Cooperative", "#exp-sorosoro"]]
    }
  };
  var ORDER = ["db", "web", "hw", "qa", "code", "media"];
  var NS = "http://www.w3.org/2000/svg";

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
    var p = 262 + i * 12.4;
    rect(u1, p, 150, 5, 12, "pin"); rect(u1, p, 298, 5, 12, "pin");
    var s = 170 + i * 12.4;
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

  /* ---------- Board selection ---------- */
  var tabs = document.getElementById("partTabs");
  ORDER.forEach(function (id) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.part = id;
    b.innerHTML = "<b>" + PARTS[id].ref + "</b>" + PARTS[id].tab;
    b.addEventListener("click", function () { select(id); });
    li.appendChild(b);
    tabs.appendChild(li);
  });

  document.querySelectorAll(".part").forEach(function (g) {
    g.addEventListener("click", function () { select(g.dataset.part); });
  });

  function select(id) {
    var d = PARTS[id];
    document.getElementById("pRef").textContent = d.ref;
    document.getElementById("pTitle").textContent = d.title;
    document.getElementById("pDesc").textContent = d.desc;
    var ul = document.getElementById("pSkills");
    ul.innerHTML = "";
    d.skills.forEach(function (s) {
      var li = document.createElement("li"); li.textContent = s; ul.appendChild(li);
    });
    var used = document.getElementById("pUsed");
    used.innerHTML = "";
    d.used.forEach(function (u, n) {
      if (n) used.appendChild(document.createTextNode(", "));
      var a = document.createElement("a");
      a.href = u[1]; a.textContent = u[0];
      a.addEventListener("click", function () { flash(u[1]); });
      used.appendChild(a);
    });
    document.querySelectorAll(".part").forEach(function (g) {
      g.classList.toggle("is-on", g.dataset.part === id);
    });
    document.querySelectorAll(".trace[data-for]").forEach(function (t) {
      t.classList.toggle("live", id === "db" || t.dataset.for === id);
    });
    tabs.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.part === id ? "true" : "false");
    });
  }

  function flash(hash) {
    var el = document.querySelector(hash);
    if (!el) return;
    var det = el.querySelector("details");
    if (det) det.open = true;
    el.classList.add("flash");
    setTimeout(function () { el.classList.remove("flash"); }, 1600);
  }

  select("db");

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
    b.type = "button";
    b.textContent = g[0];
    b.setAttribute("aria-pressed", n === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      greet.textContent = g[2];
      greet.lang = g[1];
      langBtns.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    });
    langBtns.appendChild(b);
  });

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", function () {
    var email = document.getElementById("email").textContent;
    var done = function () {
      copyBtn.textContent = "Copied";
      setTimeout(function () { copyBtn.textContent = "Copy email"; }, 1800);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(done, function () { window.location.href = "mailto:" + email; });
    } else {
      window.location.href = "mailto:" + email;
    }
  });

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeBtn");
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
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
