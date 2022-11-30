const botModels = require('../models/botModels')
const puppeteerExtra = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')




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



        for (let i = 0; i < 7000; i++) {
            
            // Icio de verificação se a pagina possue e-mail
            const pageData1 = await page.evaluate(() => {
                return {
                    html: document.documentElement.innerHTML
                }
            })
    
            const $1 = cheerio.load(pageData1.html)
    
            const emailClick = ($1('#mail-app-component > div > div > div > div.D_F.ab_FT.em_N.ek_BB.iz_A.H_6D6F > div > div > div.W_6D6F.H_6D6F.cZ1RN91d_n.o_h.p_R.em_N.D_F > div > div.p_R.Z_0.iy_h.iz_A.W_6D6F.H_6D6F.k_w.em_N.c22hqzz_GN > ul > li:nth-child(3)')).text()
             
            console.log(emailClick.length)
    
            if (emailClick.length == 0 ) {
                return res.status(200).json( { message: 'Acabou a leitura' } )
            }
            // Final da verificação

            
            page.click('#mail-app-component > div > div > div > div.D_F.ab_FT.em_N.ek_BB.iz_A.H_6D6F > div > div > div.W_6D6F.H_6D6F.cZ1RN91d_n.o_h.p_R.em_N.D_F > div > div.p_R.Z_0.iy_h.iz_A.W_6D6F.H_6D6F.k_w.em_N.c22hqzz_GN > ul > li:nth-child(3)')
            

            await page.waitForTimeout(3500);
    
            const pageData = await page.evaluate(() => {
                return {
                    html: document.documentElement.innerHTML
                }
            })

            const $ = cheerio.load(pageData.html)

            const stringEmail = ($('#mail-app-component > div > div > div.iz_A.I_ZkbNhI.em_0.Z_0 > div:nth-child(2) > ul')).text()
            const data = ($('#mail-app-component > div > div > div.iz_A.I_ZkbNhI.em_0.Z_0 > div:nth-child(2) > ul > li > div > div:nth-child(1) > header > div.D_F.en_0.M_3gJOe.A_6Eb4.C_Z1VRqsb > span')).text()
            const quemEnviou = ($('#mail-app-component > div > div > div.iz_A.I_ZkbNhI.em_0.Z_0 > div:nth-child(2) > ul > li > div > div:nth-child(1) > header > div.o_h.D_F.em_0.E_fq7.ek_BB > div.D_F.en_0 > span > span > span')).text()
    
            if(stringEmail.length > 0) {
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
                await page.waitForTimeout(2500);

                await page.click('#mail-app-component > div > div > div.ab_C.k_w.D_F.H_7bcz.en_0.P_2bJhi.p_R.m_Z14vXdP.I_ZkbNhI.gl_FM > div.D_F.em_N.gl_C > ul > li:nth-child(1) > div > button')
 
                await page.waitForTimeout(2500);
            }
            else {
                await page.click('#mail-app-component > div > div > div.ab_C.k_w.D_F.H_7bcz.en_0.P_2bJhi.p_R.m_Z14vXdP.I_ZkbNhI.gl_FM > div.D_F.em_N.gl_C > ul > li:nth-child(1) > div > button')
                
                await page.waitForTimeout(3500);
            }
        }

        return res.status(200).json( { message: 'Cadastro realizado com sucesso!' } )
    }
}
