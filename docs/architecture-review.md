## 1. Current user journey
Load page → fetch countries → normalize records → store result → render cards


## 2. Who does what

App.jsx | orchestration
countryService.js | HTTP + normalization
CountryList.jsx | list rendering
CountryCard.jsx | one-country presentation

## 3. Problems found
Finding: App parses API fields. Evidence: API field names appear in JSX. Risk: UI breaks when response shape changes.

## 4. What to fix first
1 High: duplicated normalization
2 Medium: async state ambiguity
3 Low: inconsistent file naming

## 5. One safe next change
Move normalization to service → run service tests → run component test → manually load page