
```mermaid
sequenceDiagram
  participant selain
  participant palvelin
  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
  palvelin-->>selain: HTML-koodi
  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
  palvelin-->>selain: main.css
  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  palvelin-->>selain: spa.js
  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
  palvelin-->>selain: [{"content":"test","date":"2022-04-01T11:46:46.758Z"},...]
```
