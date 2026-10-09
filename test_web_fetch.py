import urllib.request
import json
import urllib.parse
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def fetch_live_web_info(q):
    q_clean = q.strip().rstrip('?').strip()

    # 1. Wikipedia Search API
    try:
        search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q_clean)}&utf8=&format=json"
        req = urllib.request.Request(search_url, headers={"User-Agent": "CARROT-AI-SpiderNet/1.0 (Mozilla/5.0)"})
        with urllib.request.urlopen(req, timeout=3.5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get("query", {}).get("search", [])
            for res in results[:2]:
                title = res["title"]
                try:
                    summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title.replace(' ', '_'))}"
                    req_sum = urllib.request.Request(summary_url, headers={"User-Agent": "CARROT-AI-SpiderNet/1.0 (Mozilla/5.0)"})
                    with urllib.request.urlopen(req_sum, timeout=3) as resp_sum:
                        sum_data = json.loads(resp_sum.read().decode('utf-8'))
                        extract = sum_data.get("extract", "")
                        page_url = sum_data.get("content_urls", {}).get("desktop", {}).get("page", f"https://en.wikipedia.org/wiki/{urllib.parse.quote(title)}")
                        if extract and sum_data.get("type") != "disambiguation":
                            return {
                                "title": title,
                                "url": page_url,
                                "snippet": extract
                            }
                except Exception:
                    continue
    except Exception:
        pass

    # 2. DuckDuckGo Instant Answer
    try:
        ddg_url = f"https://api.duckduckgo.com/?q={urllib.parse.quote(q_clean)}&format=json&no_html=1&skip_disambig=1"
        req_ddg = urllib.request.Request(ddg_url, headers={"User-Agent": "CARROT-AI-SpiderNet/1.0"})
        with urllib.request.urlopen(req_ddg, timeout=3) as resp_ddg:
            ddg_data = json.loads(resp_ddg.read().decode('utf-8'))
            abstract = ddg_data.get("AbstractText") or ddg_data.get("Abstract")
            if abstract:
                return {
                    "title": ddg_data.get("Heading", q_clean),
                    "url": ddg_data.get("AbstractURL", f"https://duckduckgo.com/?q={urllib.parse.quote(q_clean)}"),
                    "snippet": abstract
                }
    except Exception:
        pass

    return None

test_queries = [
    'What is the population of Mars?',
    'Who is the CEO of Apple?',
    'What is Python programming language?',
    'Who is Narendra Modi?'
]

for t in test_queries:
    res = fetch_live_web_info(t)
    if res:
        print(f"QUERY: {t}")
        print(f"TITLE: {res['title']}")
        print(f"SNIPPET: {res['snippet'][:110]}...")
        print(f"URL: {res['url']}\n")
    else:
        print(f"QUERY: {t} -> FAILED\n")
