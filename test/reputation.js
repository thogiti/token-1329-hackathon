const Reputation = artifacts.require('Reputation');

contract('Reputation', accounts => {

    let reputation;
    let masterAuthAccount = accounts[0];
    let owner1 = accounts[1];
    let owner2 = accounts[2];

    before('setup', async () => {
        reputation = await Reputation.new();
    });

    it('#name should return name of token', async () => {

        const name = await reputation.name();
        assert.equal(name, 'ERC1329');
    });

    it('#symbol should return symbol of token', async () => {

        const symbol = await reputation.symbol();
        assert.equal(symbol, 'REP');
    });

    it('#granularity should return granularity of token', async () => {

        const granularity = await reputation.granularity();
        assert.equal(granularity, 1);
    });

    it('#check limit for unlimited flag', async () => {

        const hasLimit = await reputation.hasLimit();
        assert.equal(hasLimit, false);
    });

    it('#getting total limit', async () => {

        const totalLimit = await reputation.totalLimit();
        assert.equal(totalLimit.toNumber(), Math.pow(2, 256)-1);
    });

    it('#getting current supply', async () => {

        const currentSupply = await reputation.currentSupply();
        assert.equal(currentSupply.toNumber(), 0);
    });

    //---------------------------------------------------------
    // tests for balance owner
    //---------------------------------------------------------
    it('#test balance of not existent owner', async () => {

        const currentBalance = await reputation.balanceOf(0x0);
        assert.equal(currentBalance.toNumber(), 0);
    });

    it('#grantAddressAuth should grant access to address', async () => {

        const result = await reputation.grantAddressAuth(owner1.address, 1000, {from: owner1});
        console.log(result)
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        console.log(authGranted)
    });
});