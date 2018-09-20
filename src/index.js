class Test {
    constructor(name) {
        console.log("This is test class");
        this.name = name;
    }

    name;
    static staticName = "Test";

    static setName(name) {
        Test.staticName = name;
    }
}
export default Test;
let test = new Test('Suresh Reddy');
console.log(Test.staticName);
Test.setName("Test 1");
console.log(Test.staticName);
console.log (test.name);