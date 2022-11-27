const botModels = require('../models/botModels')
const puppeteerExtra = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const linkEmail = require('../db/linkEmail')

module.exports = class automation {



    static async getEmails(req, res) {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://login.yahoo.com/?.src=ym&pspid=159600001&activity=mail-direct&.partner=none&.lang=pt-BR&.intl=br&.done=https%3A%2F%2Fmail.yahoo.com%2Fd%3F.intl%3Dbr%26.lang%3Dpt-BR%26.partner%3Dnone%26.src%3Dfp');
        
        await page.waitForTimeout(2500);
        await page.type("#login-username", 'guilhermesouza902'); 

        await page.click('#login-signin')
        await page.waitForTimeout(2500);


        await page.type("#login-passwd", 'jyzGcq@*N46p+dE');

        await page.click('#login-signin');
        await page.waitForTimeout(4500);

        for (let i = 0; i < linkEmail.length; i++) {
            
            page.click(linkEmail[i])
            
            await page.waitForTimeout(3500);
    
            const pageData = await page.evaluate(() => {
                return {
                    html: document.documentElement.innerHTML
                }
            })

            const $ = cheerio.load(pageData.html)
    
            const stringEmail = ($('#mail-app-component > div > div > div.iz_A.I_ZkbNhI.em_0.Z_0 > div:nth-child(2) > ul > li:nth-child(1) > div > div:nth-child(2) > div.I_ZkbNhI.D_FY.W_6D6F')).text()
            const data = ($('#mail-app-component > div > div > div.iz_A.I_ZkbNhI.em_0.Z_0 > div:nth-child(2) > ul > li > div > div:nth-child(1) > header > div.D_F.en_0.M_3gJOe.A_6Eb4.C_Z1VRqsb > span')).text()
            const quemEnviou = ($('#mail-app-component > div > div > div.iz_A.I_ZkbNhI.em_0.Z_0 > div:nth-child(2) > ul > li > div > div:nth-child(1) > header > div.o_h.D_F.em_0.E_fq7.ek_BB > div.D_F.en_0 > span > span > span')).text()
    
    
            const emailModel = new botModels({
                stringEmail,
                data,
                quemEnviou,
            })
            try {
                emailModel.save()
            } catch (error) {
                res.status(500).json( { message: error } )
                return
            }
    
            await page.click('#app > div.I_ZnwrMC.D_F.em_N.o_h.W_6D6F.H_6D6F > div > div.a_3rehn.W_3o4BO.s_3o4BO.cZ10Gnkk_d5Y.D_F.ek_BB.em_0 > nav > div > div.Y_fq7.P_Z1jXKuU.D_B.iz_A.iy_h.it_68UO > div.folder-list.p_R.k_w.W_6D6F.U_3mS2U > ul > li:nth-child(1)')
            
            await page.waitForTimeout(3500);
        }

        return res.status(200).json( { message: 'Cadastro realizado com sucesso!' } )
    }
}
