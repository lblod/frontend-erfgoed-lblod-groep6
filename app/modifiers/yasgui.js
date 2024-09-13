import { modifier } from 'ember-modifier';
import Yasgui from '@triply/yasgui';
import '@triply/yasgui/build/yasgui.min.css';
import env from '../config/environment';

const DEFAULT_QUERY = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix adres: <https://data.vlaanderen.be/ns/adres#>
prefix generiek: <https://data.vlaanderen.be/ns/generiek#>
prefix locn: <http://www.w3.org/ns/locn#>
prefix objecten: <https://inventaris.onroerenderfgoed.be/aanduidingsobjecten/>
prefix oe: <https://id.erfgoed.net/vocab/ontology#>
prefix sdo: <https://schema.org/>
prefix xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?s ?p ?o WHERE {
  ?s ?pred oe:Aanduidingsobject .
  ?s ?p ?o .
}
LIMIT 1000
`;

export default modifier(
  function yasgui(element /*, params, hash*/) {
    const yasgui = new Yasgui(element, {
      requestConfig: { endpoint: '/sparql' },
      autofocus: true,
    });
    yasgui.config.yasqe.value = DEFAULT_QUERY;
    if (env.yasgui.extraPrefixes !== '{{YASGUI_EXTRA_PREFIXES}}')
      yasgui.config.yasqe.addPrefixes(JSON.parse(env.yasgui.extraPrefixes));
  },
  { eager: false }
);
