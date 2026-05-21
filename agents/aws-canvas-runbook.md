# AWS + Canvas runbook (Lab 3.1)

Part B: use **AI** (e.g. Cursor) to launch or repair **AWS** infra and reach a **verifiable** Canvas LMS checkpoint on **EC2**. This file records prompts, **documentation anchors**, and **verification** (commands + output excerpts).

---

## Guardrails (non-negotiable)

- **Do not commit** AWS access keys, secret keys, session tokens, `.env` secrets, or **contents of `.pem` / private key files** to any repository.  
- Prefer **redacted** hostnames/IPs in pasted output if your course requires it.  
- Store keys only in AWS Academy / local SSH agent paths your instructor approves—not in the fork.

---

## Objective (Part B)

Use AI to drive **Learner Lab → EC2 → clone/update fork → Canvas docs + Docker Compose** until you hit a **working checkpoint** (e.g. dev stack up, health-style check, or a documented install step with **command output you can show**).

---

## Typical flow (what we actually did or will do)

1. **Open AWS Academy Learner Lab** — Start session from your course’s **AWS Academy** classroom (use the **Start Lab** / console link your instructor provides; URLs vary by cohort).  
2. **EC2** — Instance running; **security group** allows **SSH (22) from your current public IP** (update rule if your IP changes after reconnecting).  
3. **Canvas on the instance** — `git clone` your fork (or `git pull` to update) to a path such as `~/canvas-lms`. Use AI to walk **official in-repo docs** (see anchors below)—not guesswork—until compose/services match upstream expectations.  
4. **Checkpoint** — e.g. `docker compose up` (or `-d`) completes, `docker compose ps` healthy, HTTP response or log line that shows the app is serving, or another step your rubric accepts **with captured output** in [Verification](#verification).

---

## Documentation anchors followed

Use these paths in the Canvas repo (summarize in AI sessions; do not paste large upstream bodies here):

| Anchor | Purpose |
|--------|---------|
| [`README.md`](../README.md) | High-level Canvas overview; wiki links for **Quick Start** / **Production Start** when not using Docker-only path. |
| [`doc/docker/README.md`](../doc/docker/README.md) | **Docker** host prep, `./script/docker_dev_setup.sh`, `docker compose up`, permissions / `docker-instructure` group notes. |
| [`doc/docker/developing_with_docker.md`](../doc/docker/developing_with_docker.md) | Day-to-day Docker dev behavior, services, troubleshooting pointers. |
| [`docker-compose.yml`](../docker-compose.yml) (repo root) | Service definitions the dev stack uses—AI should cite **service names** and dependencies when debugging compose failures. |
| [`docker-compose/`](../docker-compose/) (directory) | Compose **build contexts** and overrides (e.g. `postgres/` image, `config/*.yml`) referenced from the root compose file—use when debugging image build or service config, not only the YAML at repo root. |
| [`AGENTS.md`](../AGENTS.md) | **AI-oriented** quick commands: `docker compose up`, `docker compose run --rm web bash`, `yarn build:watch`, test/lint entry points. |

---

## AI prompts used

*Paste or adapt your real prompts below. Examples we used as templates:*

1. **Bootstrap**  
   > I am in AWS Academy Learner Lab on Ubuntu EC2. Canvas fork is at `~/canvas-lms`. Read `AGENTS.md` and `doc/docker/README.md` and give the **minimal** sequence to get the dev stack running **on this server**. Cite file paths, not generic advice.

2. **Doc navigation**  
   > Open `README.md` only for install pointers, then prioritize `doc/docker/` and root `docker-compose.yml` for my goal: *\<state goal: e.g. compose up succeeds\>*.

3. **Repair**  
   > `docker compose up` failed with: *\<paste error\>*. Propose the smallest fix; reference section/heading from `doc/docker/README.md` or compose service name.

4. **Verification**  
   > List **exact** shell commands to prove Canvas is up (compose ps, curl, log tail). I will paste output for my runbook.

**Your additional prompts (optional):**

```text
(paste here)
```

---

## Verification

**Minimum for this lab:** this subsection lists **specific commands** and the **expected signals** that indicate the Canvas dev stack is working. Paste **abridged real output** below each command. Redact IPs, tokens, and internal hostnames if needed.

### Step 1 — Compose service health

**Command** (from repo root on EC2, e.g. `~/canvas-lms`):

```bash
docker compose ps
```

**Expected signals (working):**

- Rows for core services from root [`docker-compose.yml`](../docker-compose.yml): **`web`**, **`postgres`**, **`redis`**, and usually **`jobs`**.
- **State** column shows **running** (or compose v2 equivalent such as `Up` / healthy)—not `Exit` or perpetual `Restarting`.
- No services stuck in **unhealthy** if healthchecks are defined for your compose variant.

**Output excerpt (paste your run):**

```text
(paste abridged docker compose ps output)
```

### Step 2 — HTTP response from the app

**Command** (adjust URL/port/host per [`doc/docker/README.md`](../doc/docker/README.md) and your EC2 setup—may be `localhost`, instance IP, or a proxy hostname):

```bash
curl -sI "http://127.0.0.1:<PORT>/" | head -n 8
```

**Expected signals (working):**

- First line contains **`HTTP/1.1 200`**, **`HTTP/1.1 302`**, or another **2xx/3xx** (Canvas often redirects unauthenticated users to login).
- **No** immediate `Connection refused` (means nothing listening on that host/port yet).

**Output excerpt (paste your run):**

```text
(paste abridged headers or status)
```

### Step 3 — Web container logs (sanity)

**Command:**

```bash
docker compose logs web --tail 40
```

**Expected signals (working):**

- Boot progresses without a **fatal** loop (e.g. repeated crash + stack trace every few seconds).
- You see **Rails/Puma** (or similar) “listening” / ready-for-requests style messages *or* steady request handling—wording varies by Canvas version; absence of continuous **FATAL** / **could not connect** DB errors is the main negative check.

**Output excerpt (paste your run):**

```text
(paste abridged lines)
```

### Step 4 — Optional in-container smoke

**Command:**

```bash
docker compose run --rm web bash -lc 'ruby -v && bundle -v'
```

**Expected signals (working):**

- Ruby and Bundler print **versions** and exit **0** (proves the `web` image runs and basic toolchain is reachable).

**Output excerpt (paste your run):**

```text
(paste abridged lines)
```

### Last verified

| Date | Checkpoint met | Notes |
|------|----------------|--------|
| *fill in* | *e.g. compose ps all Up + HTTP 302/200* | *no secrets* |

---

## What you turn in (course)

Per assignment instructions:

1. This file and [`agents/memory-practice.md`](memory-practice.md), both meeting the stated minimums.  
2. **Screenshot:** Canvas **working** inside your **AWS Academy** environment (browser showing the app; no keys or `.pem` in frame). **You** capture this on EC2 / tunneled access—the repo cannot store a substitute image for you.

---

## AWS / EC2 details (fill in; redact as needed)

| Field | Your value |
|--------|------------|
| Region | |
| Instance ID | e.g. `i-0abc…` (truncate if required) |
| OS image | |
| Instance type | |
| Security group | SSH from *my IP*; other ports as needed for Canvas |
| Repo path on instance | e.g. `~/canvas-lms` |

---

## Handoff

- **This lab (Part B):** Infra + clone + documented verification in this file.  
- **Next lab:** Feature work on Canvas—out of scope here.
