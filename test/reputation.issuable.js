const ReputationIssuable = artifacts.require('ReputationIssuable');
const assertRevert = require('./helpers/assertRevert')

contract('ReputationIssuable', accounts => {
    let reputation;
    let authAccount1 = accounts[0];
    let authAccount2 = accounts[1];
    let authAccount3 = accounts[2]
    let owner1 = accounts[3];
    let owner2 = accounts[4];

    before('setup', async () => {
        reputation = await ReputationIssuable.new();
        await reputation.grantAddressAuth(authAccount1, 1000, {from: owner1});
    });

    it('#issueByAuth shoul increment reputation', async () => {
        const balanceBefore = await reputation.balanceOf(owner1);
        const result = await reputation.issueByAuth(authAccount1, 100, {from: owner1});
        const issued = result.logs.filter(l => l.event === 'Issued')[0];
        const balanceAfter = await reputation.balanceOf(owner1);
        const currentSupply = await reputation.currentSupply();
        assert.equal(balanceAfter-balanceBefore, 100);
        assert.equal(currentSupply, 100);
        assert.equal(issued.args.owner, owner1);
        assert.equal(issued.args.amountProduced, 100);
    });

    // it('#', async () => {
        
    // });

    // it('#', async () => {
        
    // });

});
