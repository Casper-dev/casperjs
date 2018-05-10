const utils = require('../../src/utils')


describe('utils', () => {
  it('has parseSCString, that parses hashes', () => {
    const hash1 = '0x5764366d4b653345414152486653585331524d39795656315057695373576800'
    const parsed1 = 'Wd6mKe3EAARHfSXS1RM9yVV1PWiSsWh'

    const hash2 = '0x585266456a316a395774584c557441754864647545464c444d4c4c3239684300'
    const parsed2 = 'XRfEj1j9WtXLUtAuHdduEFLDMLL29hC'

    expect(utils.parseSCString(hash1)).toBe(parsed1)
    expect(utils.parseSCString(hash2)).toBe(parsed2)
  })

  it('has uuidToHash, that converts UUID to hash', () => {
    const uuid1 = '8yPGeBthKytEMZQSmF3XT'
    const uuid2 = 'EARYTshcSfDgope8et3uiv'

    const hash1 = 'QmbuWtZKJHh9BnRRwNe6WSMDRyDnBkDwpuifh14otRLKf7'
    const hash2 = 'QmSkyM2TAcmsdF5FFiRq7Cby9yMLoKY5LmPp8Jn9WnLoJW'

    expect(utils.uuidToHash('8yPGeBthKytEMZQSmF3XT')).toBe(hash1)
    expect(utils.uuidToHash('EARYTshcSfDgope8et3uiv')).toBe(hash2)
  })
})