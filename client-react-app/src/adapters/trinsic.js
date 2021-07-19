import {
  CredentialsServiceClient,
  Credentials,
} from "@trinsic/service-clients";

const client = new CredentialsServiceClient(
  new Credentials(process.env.REACT_APP_ACCESSTOK),
  { noRetryPolicy: true }
);

async function IssueDoctorID(formData) {
  console.log(formData);

  let params = {
    definitionId: process.env.REACT_APP_CRED_DEF_ID,
    automaticIssuance: true,
    credentialValues: formData,
  };

  let result = await client.createCredential(params);
  return result;
}

export { IssueDoctorID };
