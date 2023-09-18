#Função para calcular INSS
def inss (bruto):
    faixa = [1320,2571.29,3856.94,7507.49]
    aliquota = [0.075,0.09,0.12,0.14]
    total = faixa[0]*aliquota[0]
    
    if bruto < faixa[0]:
        return bruto*aliquota[0]
    
    
    for i in range (1,len(faixa)):
        if bruto <= faixa[i]:
            total+=(max(bruto-faixa[i-1],0))*aliquota[i]
            return total
        else:
            total+= (faixa[i]-faixa[i-1])*aliquota[i]
    
    return 877.24

#Função para calcular IRRF
def irrf(bruto,pen,dep):
    base = bruto - inss(bruto) - pen - dep*189.59
    faixaIrrf = [2112,2826.65,3751.05,4664.68]
    aliquotaIrrf = [0,0.075,0.15,0.225,0.275]
    deducaoIrrf = [0,158.40,370.40,651.73,884.96]
    
    for i in range(0,4):
        if base <=faixaIrrf[i]:
            return base*aliquotaIrrf[i]-deducaoIrrf[i]
    
    return base*aliquotaIrrf[4]-deducaoIrrf[4]


def diasF(numFaltas):
    faixasFaltas = [5,14,23,32]
    diasFaltas = [30,24,18,12]

    for faixa in faixasFaltas:
        if numFaltas <= faixa:
            return diasFaltas[faixasFaltas.index(faixa)]
    
    return 0    
    
    
def ferias(bruto,pen,dep,hExtra,diasFerias):
    base = ((bruto+hExtra)/30)*diasFerias*(4/3)
    total = base- inss(base) - irrf (base,pen,dep)
    return total
    
print(ferias(3000,0,0,500,30,4,'n','n'))
    
''' 
#Variáveis
salario = float(input("Informe salário: "))
dependentes = float(input("Informe dependentes: "))
pensao = float(input("Informe pensão: "))
outros = float(input("Outros descontos: "))

#Saída de dados
print("Inss: R$ %.2f" % inss(salario))
print("IRRF: R$ %.2f" % irrf(salario,dependentes,pensao))
print("Pensão alimentícia: R$ %.2f" % pensao)
print("Outros descontos: R$ %.2f" % outros)
'''