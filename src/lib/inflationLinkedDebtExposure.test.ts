import assert from "node:assert/strict";

import {
  buildInflationLinkedDebtExposure,
  type InflationLinkedDebtExposureSource,
} from "./inflationLinkedDebtExposure.js";

const source: InflationLinkedDebtExposureSource = {
  title: "Inflation-linked debt exposure",
  subtitle: "How RPI linkage increases the UK's debt burden",
  period: "December 2025",
  timestamp: "2026-03-21T00:00:00.000Z",
  source: "Office for National Statistics / UK Debt Management Office",
  sources: {
    cpi: {
      label: "Office for National Statistics",
      series: "D7G7",
      description: "CPI annual rate 00: all items 2015=100",
      url: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23",
      period: "December 2025",
      value: 3.4,
    },
    rpi: {
      label: "Office for National Statistics",
      series: "CZBH",
      description: "RPI all items: percentage change over 12 months",
      url: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/czbh/mm23",
      period: "December 2025",
      value: 4.2,
    },
    indexLinkedDebtStock: {
      label: "UK Debt Management Office",
      description: "Stock of index-linked debt at end-December 2025",
      url: "https://www.dmo.gov.uk/media/0uuiqi10/drmr2627.pdf",
      period: "December 2025",
      value: 688.5,
    },
  },
};

const exposure = buildInflationLinkedDebtExposure(source);

assert.equal(exposure.period, "December 2025");
assert.deepEqual(
  exposure.items.map((item) => item.key),
  ["cpi", "rpi", "index_linked_debt", "extra_debt_from_rpi_linkage"],
);
assert.deepEqual(
  exposure.items.map((item) => item.value),
  [3.4, 4.2, 688.5, 5.5],
);
assert.deepEqual(
  exposure.items.map((item) => item.unit),
  ["percent", "percent", "gbp_billions", "gbp_billions"],
);
assert.deepEqual(
  exposure.items.map((item) => item.highlight),
  [false, false, true, true],
);

console.log("inflationLinkedDebtExposure.test.ts passed");
