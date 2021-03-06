import {
  buildResourceIndex,
  FAKE_RESOURCES
} from "../__test_support__/resource_index_builder";
import { TaggedFarmEvent } from "../resources/tagged_resources";

const STUB_RESOURCE: TaggedFarmEvent = {
  "uuid": "farm_events.0.435",
  "kind": "farm_events",
  "specialStatus": undefined,
  "body": {
    "id": 217,
    "start_time": "2017-07-21T00:30:00.000Z",
    "end_time": "2017-07-21T00:31:00.000Z",
    "repeat": 1,
    "time_unit": "never",
    "executable_id": 78,
    "executable_type": "Regimen"
  }
};

test("buildResourceIndex - base case", () => {
  let result1 = buildResourceIndex(FAKE_RESOURCES);
  let { index } = result1;
  const OK_LENGTH = FAKE_RESOURCES.length;
  expect(index.all.length).toBe(OK_LENGTH);
  expect(Object.keys(index.references).length).toBe(OK_LENGTH);
});

test("buildResourceIndex - add a FarmEvent", () => {
  let db = buildResourceIndex([STUB_RESOURCE]);
  let fe = db.index.references[db.index.byKind.farm_events[0]];
  expect(fe).toBeTruthy();
  if (fe && fe.kind === "farm_events") {
    let { body } = fe;
    expect(body).toEqual(STUB_RESOURCE.body);
  } else {
    fail("fe was falsy or not a farm event.");
  }
});
