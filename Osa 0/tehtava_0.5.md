```mermaid
sequenceDiagram
  participant selain
  participant palvelin
  selain->>palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  palvelin->>selain: {"message":"note created"}
```
