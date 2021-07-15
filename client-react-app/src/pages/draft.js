<Network>
<p>Connected to</p>
<p>
  <span>{connectedToNet}</span>
</p>
</Network>

<AddressContainer>
<Address>
  <p>{`${userAddress.substring(0, 9)}...${userAddress.substring(
    33,
    42
  )}`}</p>
</Address>
<Balance>
  <p>${userBalance}</p>
</Balance>
{/* <h1>Home Page protected page</h1> */}
<DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>

<Avatar>
  <Blockies seed={userAddress} size={15} scale={3} className="avatar" />
</Avatar>

<Tooltip placement="rightTop" title="Copy value to clipboard">
  <ClipboardCopy>
    <CopyToClipboard text={userAddress}>
      <UseAnimations
        animation={copy}
        size={35}
        strokeColor={"#258fe6"}
        wrapperStyle={{
          color: "#258fe6",
        }}
      />
    </CopyToClipboard>
  </ClipboardCopy>
</Tooltip>
</AddressContainer>