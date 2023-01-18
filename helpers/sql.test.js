const { sqlForPartialUpdate } = require("./sql")

describe("sqlForPartialUpdate", function () {
    test("passes for 1 item input", function() {
        const result = sqlForPartialUpdate(
        
            {testK: "test_v"},
            {testK: "test_k"}
            )
        expect(result).toEqual({
            setCols: "\"test_k\"=$1",
            values: ["test_v"]

        })
    });

    test("passes 2 items", function () {
        const result = sqlForPartialUpdate(
            { k1: "v1", wowItWorks: "v2" },
            {wowItWorks: "k2" }
        );
        expect(result).toEqual({
            setCols: "\"k1\"=$1, \"k2\"=$2",
            values: ["v1", "v2"]
        })
        expect(result.values.length).toEqual(2)
    })

    test("converts specified variable names from JS to SQL", () => {
        const result = sqlForPartialUpdate(
            { k1: "v1", wowItWorks: "v2" },
            {wowItWorks: "k2" }
        );
        expect(result.setCols.split(', ')[1]).toEqual("\"k2\"=$2")
        expect(result.values.length).toEqual(2)
    })
})