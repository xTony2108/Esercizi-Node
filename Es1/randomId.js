const randomBytes = crypto.randomBytes(4);

const randomId = randomBytes.toString("hex");
console.log(randomId);
