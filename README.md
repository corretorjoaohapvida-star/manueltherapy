# Manuel d’art-thérapie — página para Git e Vercel

Página estática em francês, com todas as seções visuais, galeria de dez amostras, bônus, oito perguntas frequentes e modais de políticas.

- Pixel Meta: **1037423592663642**, com o evento **PageView** e imagem de fallback sem JavaScript.
- Checkout: **https://pay.hotmart.com/F107872743Q?checkoutMode=10**.
- Preço exibido na página: **17,97 €**. O valor cobrado no checkout é definido na oferta da Hotmart.
- Os dois botões de compra levam diretamente à Hotmart, inclusive com JavaScript desativado. O botão inicial navega até a oferta.
- As 28 imagens e fontes estão em `dist/assets/`. O vídeo continua usando a URL pública da referência.
- Depoimentos e nota foram mantidos conforme a confirmação do usuário. A página não exibe contadores de visitantes, prazo artificial ou rótulos de demonstração. Preço, checkout e Pixel permanecem configurados.

## Enviar para GitHub

Envie o conteúdo desta pasta como raiz do repositório: `dist/`, `vercel.json`, `.gitignore` e este `README.md`. Inclua `dist/`: ela contém os arquivos que serão publicados.

O repositório local foi inicializado na branch `main`. Para fazer o primeiro commit e enviar usando o terminal, com sua identidade Git já configurada:

```powershell
git init -b main
git add .
git commit -m "Configure landing page, Meta Pixel and Hotmart checkout"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Os nomes em maiúsculas são campos para substituir pelo seu repositório. Nenhum endereço remoto ou credencial foi configurado.

## Publicar na Vercel

1. Acesse a Vercel e escolha **Add New → Project**.
2. Importe o repositório GitHub.
3. Deixe **Root Directory** na raiz do repositório.
4. Use **Framework Preset: Other**, sem comando de build ou instalação, e **Output Directory: dist**.
5. Clique em **Deploy**.

O `vercel.json` já define a saída `dist`, sem dependências ou build. Se enviar esta pasta para dentro de outro repositório, selecione a pasta que contém `vercel.json` como Root Directory.

Referências oficiais: [deploy de repositórios Git](https://vercel.com/docs/git) e [configuração vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

## Verificar o Pixel

Abra a URL publicada no recurso **Test Events** do Events Manager da Meta ou use a extensão **Meta Pixel Helper**. Bloqueadores de anúncios podem impedir os envios. A instalação na landing page registra visitas; eventos de compra dependem da configuração do checkout da Hotmart.

## Editar depois

O checkout está em `dist/config.js` e nos dois links `data-checkout` de `dist/index.html`. Ao trocar o endereço, atualize os três lugares para preservar a navegação sem JavaScript. O Pixel está no `<head>` de `dist/index.html`, com fallback `<noscript>` no início do `<body>`.

Referência visual: https://manuel-d-art-therapie.impultienda.ar/

Esta entrega prepara os arquivos para envio e deploy. Nenhum repositório remoto foi criado ou deployment na Vercel executado.
