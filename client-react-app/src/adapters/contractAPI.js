import { ethers } from "ethers";
import PatientRecord from "../artifacts/contracts/PatientRecords.sol/PatientRecords.json";

export const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export function initContract() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      PatientRecord.abi,
      provider
    );
    return { provider: provider, contract: contract, abi: PatientRecord.abi };
  } else {
    return 0;
  }
}

/* 
 Example usage
    import {contractAddress, requestAccount, initContract} from "/adapters/contractAPI"
    requestAccount();
    let result = initContract();
    if(result != 0) {
        const data = await result.Contract.greet();
        console.log('data : ', data); 
    }


*/
