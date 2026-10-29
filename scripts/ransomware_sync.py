"""Descarga los reclamos de ransomware contra organizaciones peruanas (ransomware.live)
y genera data/ransomware-pe.json (crudo) y data/ransomware.js (agregados para el dashboard).
Uso: python3 -I scripts/ransomware_sync.py
"""
import json, collections, urllib.request, datetime, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = "https://api.ransomware.live/v2/countryvictims/PE"
raw = json.load(urllib.request.urlopen(URL, timeout=60))
(ROOT/"data/ransomware-pe.json").write_text(json.dumps(raw, ensure_ascii=False, indent=1), encoding="utf-8")

# Entradas etiquetadas PE pero de empresas de otros países (revisión manual)
FOREIGN = {"HYMIASA", "Upanal CNC Solutions", "Grupo San Jacinto", "peruzzi.com"}
rows = [v for v in raw if v.get("post_title") not in FOREIGN]
year = collections.Counter((v.get("discovered") or v.get("published") or "")[:4] for v in rows)
grp = collections.Counter(v.get("group_name") for v in rows)
sec = collections.Counter(v.get("activity") or "Sin dato" for v in rows)
GN = {"qilin":"Qilin","lockbit3":"LockBit 3","lockbit5":"LockBit 5","lockbit2":"LockBit 2","thegentlemen":"The Gentlemen",
      "safepay":"SafePay","nova":"Nova","blackshrantac":"BlackShrantac","akira":"Akira","apt73":"APT73","ransomhub":"RansomHub",
      "direwolf":"Dire Wolf","killsec":"KillSec","incransom":"INC Ransom","rhysida":"Rhysida","medusa":"Medusa","nightspire":"NightSpire",
      "sarcoma":"Sarcoma","cloak":"Cloak","krybit":"Krybit","ransomhouse":"RansomHouse","dragonforce":"DragonForce","everest":"Everest",
      "clop":"Cl0p","ransomexx":"RansomEXX","8base":"8Base","hive":"Hive","blackbyte":"BlackByte","anubis":"Anubis","lynx":"Lynx",
      "babuk2":"Babuk2","meow":"Meow","darkpower":"DarkPower","aurora":"Aurora","arcusmedia":"Arcus Media","coinbasecartel":"Coinbase Cartel",
      "vect":"Vect","radar":"Radar","ElDorado":"ElDorado","Panzer":"Panzer"}
SN = {"Government & Defense":"Estado y defensa","Agriculture and Food Production":"Agro y alimentos","Manufacturing":"Manufactura",
      "Professional Services":"Servicios profesionales","Technology":"Tecnología","Healthcare":"Salud","Energy & Utilities":"Energía y servicios",
      "Retail & E-Commerce":"Retail","Financial Services":"Finanzas y seguros","Other":"Otros","Transportation":"Transporte",
      "Education":"Educación","Hospitality":"Turismo","Not Found":"Sin dato","Sin dato":"Sin dato"}
out = {
  "corte": datetime.date.today().isoformat(),
  "total": len(rows),
  "total_crudo": len(raw),
  "por_anio": dict(sorted(year.items())),
  "grupos": [[GN.get(g,g), n] for g,n in grp.most_common(10)],
  "sectores": [[SN.get(s,s), n] for s,n in sec.most_common()],
  "ultimo": max((v.get("discovered") or "")[:10] for v in rows),
}
js = "// Generado por scripts/ransomware_sync.py desde ransomware.live (reclamos de bandas, no confirmaciones).\n"
js += "window.RANSOMWARE = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n"
(ROOT/"data/ransomware.js").write_text(js, encoding="utf-8")
print(out["total"], out["por_anio"], out["grupos"][:5])
