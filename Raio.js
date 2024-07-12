
const { Builder, By, Key, until } = require('selenium-webdriver');
const { JSDOM } = require('jsdom');
const assert = require('assert');
const readline = require('readline');
const { log } = require('console');

describe('======== HORA DO CODE REVIEW ========', function () {
    this.timeout(70000);
    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('firefox').build();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('Desenvolvido pelo Progamador : Gabriel Santos,Nivel 1', async function () {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Definindo uma Promise para esperar a resposta do usuário
        await new Promise((resolve, reject) => {
          console.log();
            rl.question('== DIGITE O NUMERO DA DEMANDA:  ', async (resp) => {
                // Fechar a interface readline
                rl.close();
                
                // Abrir a página da web somente após o usuário fornecer uma resposta
                await driver.get("https://gitlab.marica.rj.gov.br/users/sign_in");
                await driver.findElement(By.css("#user_login")).sendKeys("gabriel.santos@libresolucoes.com.br");
                await driver.findElement(By.css("#user_password")).sendKeys("almondega");
                await driver.findElement(By.xpath(".//button[contains(.,'Sign in')]")).click();
                await driver.findElement(By.xpath(".//aside[@id='super-sidebar']/div[2]/div/nav/ul/li[3]/a")).click();
                var inputElement = await driver.findElement(By.css(".gl-clear-icon-button > .gl-button-icon"));
                await inputElement.click();
                var inputElement = await driver.findElement(By.css(".gl-filtered-search-term-input"));
                await inputElement.sendKeys(resp);
                var inputElement = await driver.findElement(By.css(".gl-search-box-by-click-search-button > .gl-button-icon"));
                await inputElement.click();
                await driver.sleep(1000);
                var inputElement = await driver.findElement(By.css(".issue-title-text"));
                await inputElement.click();
                await driver.sleep(1000);
                var inputElement = await driver.findElement(By.xpath(".//div[@id='related-branches']/div/div[2]/ul/li/div/div/div/span/strong/a"));
                await inputElement.click();
                await driver.sleep(100);
            
                // Resolve a Promise após a execução do código
                resolve();
            });
        });
    let elements = await driver.findElements(By.css('.diff-file.file-holder'));
    let palavrasBuscadas = ['require_once','$teste','erro aqui','ate aqui','resolvido','cheguei ate aqui','echo','var_dump()','print_r()','error_log()','xdebug','die','/dd','//dd','//die','/die','var','//sql','/sql','//dd','//var_dump('];
    for (let element of elements) {
      let text = await element.getText();
      let spans = await element.findElements(By.tagName('span'));
    for (let span of spans) {
          let spanText = await span.getText();
          let spanId = await span.getAttribute('id');
    for (let palavraBuscada of palavrasBuscadas) {
              if (spanText.includes(palavraBuscada)) {
                  if (spanId) {
                    let linhaString = `${spanId}`;
                    let numeroLinha = linhaString.match(/(\d+)/)[1];
                      let dataBlobDiffPath = await element.getAttribute('data-blob-diff-path');
                      console.log();
                      console.log('___________________________________________________________'); 
                      console.log();
                      console.log(`ENCONTREI: "${palavraBuscada}"`);
                      console.log();
                      console.log(`NA LINHA: "${numeroLinha}"`);
                      console.log(); 
                      let texto = `${dataBlobDiffPath}`;
                      let match = texto.match(/\/([^\/]+\.(php|js|html))\//);
                      if (match) {
                          let nomeDoArquivo = match[1];
                          console.log("NO FONTE: ", nomeDoArquivo); 
                          console.log('___________________________________________________________'); 
                      }                      
                  }
              }
          }
      }
  }
});
});