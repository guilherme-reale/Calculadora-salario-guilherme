document.getElementById("calculadoraForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
    const brutoHorasExtras = parseFloat(document.getElementById("brutoHorasExtras").value);
    const numeroFaltas = parseFloat(document.getElementById("numeroFaltas").value);
    
    do{
        var venderFerias = parseFloat(document.getElementById("venderFerias").value);
        if(venderFerias!=0 && venderFerias !=1){
            alert("Digite 0 para não e 1 para sim.");
        }

    }while(venderFerias!=0 && venderFerias!=1);

    const dependentes = parseFloat(document.getElementById("dependentes").value);
    const pensao = parseFloat(document.getElementById("pensao").value);
    const outrosDescontos = parseFloat(document.getElementById("outrosDescontos").value);

    const faixaInss = [1320,2571.29,3856.94,7507.49];
    const aliquotaInss = [0.075,0.09,0.12,0.14];

    const faixaIrrf = [2112,2826.65,3751.05,4664.68];
    const aliquotaIrrf = [0,0.075,0.15,0.225,0.275];
    const deducaoIrrf = [0,158.40,370.40,651.73,884.96];

    const faixasFaltas = [5,14,23,32];
    const diasFaltas = [30,24,18,12];

    function inss(bruto)
    {
        var totalInss = faixaInss[0]*aliquotaInss[0];

        if (bruto < faixaInss[0])
        {
            return bruto*aliquotaInss[0];
        }

        for (let i = 1; i<faixaInss.length; i++)
        {
            if(bruto<=faixaInss[i])
            {
                totalInss+=(Math.max(bruto-faixaInss[i-1],0))*aliquotaInss[i];
                return totalInss;
            }
            else
            {
                totalInss+= (faixaInss[i]-faixaInss[i-1])*aliquotaInss[i]
            }
        }
        
        return 877.24;
    
    }

    function irrf(bruto,pen,dep)
    {
        var base = bruto - inss(bruto) - pen - dep*189.59;

        for (let i = 0; i<4;i++)
        {
            if(base <= faixaIrrf[i])
            {
                return base*aliquotaIrrf[i]-deducaoIrrf[i];
            }
        }

        return base*aliquotaIrrf[4]-deducaoIrrf[4];
    }

    function diasFerias(n){
    
        for (let i =0; i<faixasFaltas.length;i++){
            if  (n <= faixasFaltas[i]){
                return diasFaltas[i];
            }
        
        }
            
        return 0;    
    }

    function ferias(bruto,brutoExtra,pen,dep,numFaltas,vender){
        let base = ((bruto+brutoExtra)/30)*(diasFerias(numFaltas)*(2/3)**(vender))*(4/3);
        let total = base +vender*(bruto+brutoExtra)/30*diasFerias(numFaltas)*(1/3)*(4/3) - inss(base) - irrf (base,pen,dep);
        return total;
    }
    
    const valorInss = inss(salarioBruto);
    const valorIrrf = irrf(salarioBruto,pensao,dependentes);
    const valorOutros = pensao + outrosDescontos;
    const salarioLiquido = salarioBruto - valorInss - valorIrrf - valorOutros;
    let valorFerias = ferias(salarioBruto,brutoHorasExtras,pensao,dependentes,numeroFaltas,venderFerias);
    
    
    document.getElementById("resultadoInss").textContent = `Inss: R$ ${valorInss.toFixed(2)} `;
    document.getElementById("resultadoIrrf").textContent = `Irrf: R$ ${valorIrrf.toFixed(2)} `;
    document.getElementById("resultadoOutros").textContent = `Outros: R$ ${valorOutros.toFixed(2)} `;
    document.getElementById("resultadoLiquido").textContent = `Salário Líquido: R$ ${salarioLiquido.toFixed(2)} `;
    document.getElementById("valorFerias").textContent = `Férias: R$ ${valorFerias.toFixed(2)} `;

});