const dotenv = require("dotenv");
const { JsonRpcProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const { formatEther, parseEther } = require("@ethersproject/units");

const provider = new JsonRpcProvider(
  "https://rinkeby.infura.io/v3/edc067050c394f3e889be5490129706b",
  4
);
dotenv.config();
const wallet = new Wallet(process.env.PRIVATE_KEY).connect(provider);

const sendETH = async () => {
  try {
    const curBalance = await wallet.getBalance();
    console.log("current balance", formatEther(curBalance));

    const tx = await wallet.sendTransaction({
      to: "0x1BaB8030249382A887F967FcAa7FE0be7B390728",
      value: parseEther("0.01"),
    });
    console.log(tx.hash);
    await provider.waitForTransaction(tx.hash);

    const newBalance = await wallet.getBalance();
    console.log("new balance", formatEther(newBalance));
  } catch (e) {
    console.error(e);
  }
};

sendETH();
//https://rinkeby.etherscan.io/tx/0x22d418c4deabe157e3d611e2b4bb4d1dcdcca2c09e8b20abc898089da9c4fdce
