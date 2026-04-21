JavaScript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains results", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results.length).to.be.above(0);
});

pm.test("User email exists", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results[0].email).to.exist;
});

pm.test("Check if user is female", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results[0].gender).to.eql("female");
});
