# laptop-crawler-challange
Desafio requisitado para uma entrevista de emprego (tornarei o repositório privado quando finalizar o teste)

## O desafio
Acessar esse site e pegar todos notebooks Lenovo ordenando do mais barato para o mais caro. 
Pegar todos os dados disponíveis dos produtos.
 
É interessante que o robô possa ser consumido por outros serviços. 
Recomendamos a criação de uma pequena RESTFul API JSON para deixar mais otimizado.
 
- Utilizar Puppeteer ou Playwright.
 
- Criar um repositório no github e nos enviar o link.
 
site:
https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops

## O plano

O sistema será composto por uma RESTful API 
e um serviço central (GetLenovoLaptopsSortedByAscendingPriceService)

![Modelagem](./static/modelling.png)

O fluxo se dará da seguinte forma:  
![Fluxo](./static/flow.png)

As bibliotecas utilizadas serão:
- [Puppeteer](https://github.com/puppeteer/puppeteer), usada pela GetLaptopsByBrandSerevice
- [Express](https://github.com/expressjs/express), usada pela LaptopAPI

## Cronograma

O desafio foi lançado em 4 de Julho de 2022 e deverá ser entrege até 11 de Julho de 2022 às 10:00 da manhã.

