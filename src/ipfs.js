const IPFS = require("ipfs-mini");
// connect to ipfs daemon API server
const ipfs = new IPFS({host: "ipfs.infura.io", port: "5001", protocol: "https"});

// IFPS Experiment

ipfs.add("dweewefw", (err, hash) => {
    console.log(hash);
});

ipfs.cat("Qmbd2Arp3Dpx4rtA49XkR9HnqJkNbm9AbmmtneigDdYmho", (err, result) => {
    console.log(err, result);
});

export default ipfs;
