document.addEventListener('DOMContentLoaded', function() {
    var heartRateChartInstance = []; 
  
    const pacientes = [
    { 
        id: 0, 
        nome: 'João Silva', 
        idade: 45, 
        peso: '95 kg', 
        altura: '1,78 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [72, 75, 74, 73, 76] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [74, 75, 73, 72, 76] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [72, 74, 75, 73, 76] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', '2025-01-01T05:00:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', 
                    '2025-01-01T12:00:00', '2025-01-01T13:00:00', '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T23:00:00'
                ], 
                data: [
                    70, 70, 70, 71, 72, 71, 71, 72, 74, 73, 73, 74, 
                    75, 76, 76, 74, 72, 73, 74, 75, 75, 74, 73, 73
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            }
        }
    },
    { 
        id: 1, 
        nome: 'Ana Costa', 
        idade: 60, 
        peso: '120 kg', 
        altura: '1,65 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [90, 92, 95, 88, 89] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [92, 90, 91, 93, 90] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [89, 90, 91, 92, 90] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', 
                    '2025-01-01T05:00:00', '2025-01-01T05:30:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', 
                    '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', '2025-01-01T12:00:00', '2025-01-01T13:00:00', 
                    '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T15:15:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', 
                    '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T23:00:00'
                ], 
                data: [
                    90, 90, 90, 91, 92, 
                    91, 91, 91, 92, 93, 
                    90, 90, 89, 89, 88, 
                    88, 89, 89, 90, 91, 
                    91, 92, 92, 90, 89, 89
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            },
            oneHourMin: { 
                label: [], 
                data: [] 
            }
        }
    },
    { 
        id: 2, 
        nome: 'Carlos Almeida', 
        idade: 32, 
        peso: '85 kg', 
        altura: '1,75 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [78, 80, 76, 75, 79] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [77, 78, 76, 75, 78] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [78, 79, 76, 77, 75] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', '2025-01-01T05:00:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', 
                    '2025-01-01T12:00:00', '2025-01-01T13:00:00', '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T23:00:00'
                ], 
                data: [
                    77, 77, 77, 78, 78, 77, 76, 77, 78, 79, 79, 77, 
                    75, 76, 76, 77, 78, 79, 79, 77, 76, 76, 76, 76
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            }
        }
    },
    { 
        id: 3, 
        nome: 'Maria Ferreira', 
        idade: 45, 
        peso: '70 kg', 
        altura: '1,62 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [75, 76, 77, 78, 76] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [76, 75, 77, 76, 78] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [75, 76, 78, 77, 76] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', '2025-01-01T05:00:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', 
                    '2025-01-01T12:00:00', '2025-01-01T13:00:00', '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T23:00:00'
                ], 
                data: [
                    76, 76, 76, 75, 75, 76, 77, 76, 78, 76, 78, 77, 
                    76, 75, 75, 76, 77, 76, 76, 77, 76, 76, 75, 75
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            }
        }
    },
    { 
        id: 4, 
        nome: 'Lucas Santos', 
        idade: 29, 
        peso: '82 kg', 
        altura: '1,80 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [70, 72, 71, 70, 69] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [71, 70, 72, 71, 69] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [70, 71, 69, 70, 71] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', '2025-01-01T05:00:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', 
                    '2025-01-01T12:00:00', '2025-01-01T13:00:00', '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T23:00:00'
                ], 
                data: [
                    71, 71, 71, 70, 70, 69, 69, 70, 71, 70, 70, 69, 
                    69, 70, 71, 70, 69, 70, 70, 69, 71, 70, 71, 71
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            }
        }
    },
    { 
        id: 5, 
        nome: 'Julia Pereira', 
        idade: 36, 
        peso: '68 kg', 
        altura: '1,65 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [76, 77, 78, 77, 76] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [77, 76, 78, 77, 76] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [76, 77, 78, 76, 77] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', '2025-01-01T05:00:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', 
                    '2025-01-01T12:00:00', '2025-01-01T13:00:00', '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T23:00:00'
                ], 
                data: [
                    77, 77, 77, 76, 76, 78, 78, 76, 77, 76, 77, 76, 
                    78, 76, 77, 76, 78, 76, 77, 76, 77, 76, 77, 77
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            }
        }
    },
    { 
        id: 6, 
        nome: 'Paciente de Alerta', 
        idade: 55, 
        peso: '80 kg', 
        altura: '1,70 m', 
        heartRateChart: {
            daily: { 
                label: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], 
                data: [180, 182, 185, 183, 186] 
            },
            monthly: { 
                label: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                data: [182, 181, 183, 180, 184] 
            },
            weekly: { 
                label: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana', '5ª Semana'], 
                data: [181, 183, 182, 185, 180] 
            },
            hourly: { 
                label: [
                    '2025-01-01T00:00:00', '2025-01-01T01:00:00', '2025-01-01T02:00:00', '2025-01-01T03:00:00', '2025-01-01T04:00:00', '2025-01-01T05:00:00', '2025-01-01T06:00:00', '2025-01-01T07:00:00', '2025-01-01T08:00:00', '2025-01-01T09:00:00', '2025-01-01T10:00:00', '2025-01-01T11:00:00', 
                    '2025-01-01T12:00:00', '2025-01-01T13:00:00', '2025-01-01T14:00:00', '2025-01-01T15:00:00', '2025-01-01T16:00:00', '2025-01-01T17:00:00', '2025-01-01T18:00:00', '2025-01-01T19:00:00', '2025-01-01T20:00:00', '2025-01-01T21:00:00', '2025-01-01T22:00:00', '2025-01-01T22:30:00', '2025-01-01T23:00:00' 
                ], 
                data: [
                    170, 175, 180, 181, 182, 180, 179, 183, 185, 184, 186, 185,
                    187, 188, 189, 187, 186, 185, 184, 183, 182, 181, 180, 182, 185 
                ] 
            },
            daily5MinAvg: {
                label: [], 
                data: []
            }
        }
    },
  ]; 

    function generate5MinData(hourlyData, hourlyLabels) {
        const fiveMinLabels = [];
        const fiveMinData = [];
        
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 5) {
                const hourStr = String(h).padStart(2, '0');
                const minuteStr = String(m).padStart(2, '0');
                fiveMinLabels.push(`2025-01-01T${hourStr}:${minuteStr}:00`);
                
                let valueForInterval;
                const exactHourlyLabel = `2025-01-01T${hourStr}:00:00`;
                const exactHourlyIndex = hourlyLabels.indexOf(exactHourlyLabel);

                if (exactHourlyIndex !== -1) {
                    valueForInterval = hourlyData[exactHourlyIndex];
                } else {
                    let closestPrecedingHourIndex = -1;
                    let lastKnownValue = hourlyData[0]; 

                    for(let i = 0; i < hourlyLabels.length; i++) {
                        const currentLabelMoment = moment(hourlyLabels[i]);
                        const targetMoment = moment(`2025-01-01T${hourStr}:${minuteStr}:00`);
                        if (currentLabelMoment.isSameOrBefore(targetMoment, 'hour')) {
                            closestPrecedingHourIndex = i;
                            lastKnownValue = hourlyData[i];
                        } else {
                            break;
                        }
                    }
                    valueForInterval = lastKnownValue;
                }


                fiveMinData.push(Math.round(valueForInterval + (Math.random() * 6 - 3))); 
            }
        }
        return { label: fiveMinLabels, data: fiveMinData };
    }


    pacientes.forEach(paciente => {
        const { label: hourlyLabels, data: hourlyData } = paciente.heartRateChart.hourly;
        const fiveMinData = generate5MinData(hourlyData, hourlyLabels);
        paciente.heartRateChart.daily5MinAvg = fiveMinData;
    });


    const anaCosta = pacientes.find(p => p.id === 1);
    if (anaCosta) {
        const oneHourMinLabels = [];
        const oneHourMinData = [];

        for (let m = 0; m < 60; m++) {
            const minuteStr = String(m).padStart(2, '0');
            oneHourMinLabels.push(`2025-01-01T10:${minuteStr}:00`);
            oneHourMinData.push(90 + Math.floor(Math.random() * 21) - 10); 
        }
        anaCosta.heartRateChart.oneHourMin = { label: oneHourMinLabels, data: oneHourMinData };
    }


    let ordem = {
        chave: null,
        direcao: 'asc'
    };

    renderPacientes(pacientes);

    function renderPacientes(pacientesToRender) { 
      const tabela = document.getElementById('pacientes-tabela');
        tabela.innerHTML = '';

        pacientesToRender.forEach((paciente, index) => {
            const hourlyData = paciente.heartRateChart.hourly.data;
            const fcAtual = hourlyData[hourlyData.length - 1];
            const fcMax24h = Math.max(...hourlyData);
            const fcMin24h = Math.min(...hourlyData);
            const fcMedia24h = hourlyData.reduce((sum, val) => sum + val, 0) / hourlyData.length;
          
            paciente.fcAtual = fcAtual;
            paciente.fcMedia24h = parseFloat(fcMedia24h.toFixed(1)); 
            paciente.fcMax24h = fcMax24h;
            paciente.fcMin24h = fcMin24h;
            
            let fcAtualClass = fcAtual > 180 ? ' alerta-fc-atual' : '';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.nome}</td>
                <td>${paciente.idade}</td>
                <td class="${fcAtualClass.trim()}">${fcAtual} BPM</td>
                <td>${fcMedia24h.toFixed(1)} BPM</td>
                <td>${fcMax24h} BPM</td>
                <td>${fcMin24h} BPM</td>
                <td class="toggle-btn"><button onclick="toggleDetalhes(${index})">↕</button></td>
            `;

            tabela.appendChild(row);
 
            const detalhesRow = document.createElement('tr');
            detalhesRow.classList.add('detalhes');
            detalhesRow.innerHTML = `
                <td colspan="7" id="detalhes-${index}" class="detalhes-container hidden">
                    <div class="modal">
                        <div class="details-content">
                            <div class="left-section">
                                <div class="item">
                                  <span>Nome do Paciente:</span>
                                  <span class="value">${paciente.nome}</span>
                                </div>
                                <div class="item">
                                  <span>Altura:</span>
                                  <span class="value">${paciente.altura}</span>
                                  <span>Idade:</span> 
                                  <span class="value">${paciente.idade}</span>
                                </div>
                                <div class="item">
                                  <span>Peso:</span>
                                  <span class="value">${paciente.peso}</span>
                                </div>
                                <div class="item">
                                  <span>Frequência Cardíaca:</span>
                                  <span class="value">${fcAtual}</span>
                                  <span class="unit">BPM</span>
                                </div>
                            </div>
                            <div class="center-section"> 
                              <div class="charts charts-${index}" id="charts-${index}"> 
                                <h3>Frequência Cardíaca</h3>
                                <canvas id="heartRateChartCanvas-${index}"></canvas>
                                <select id="granularitySelector-${index}" class="selector">
                                  <option value="daily5MinAvg">Últimas 24h (Média 5 min)</option>
                                  ${paciente.id === 1 ? '<option value="oneHourMin">10:00-11:00 (Minuto a Minuto)</option>' : ''}
                                </select>
                             </div>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            tabela.appendChild(detalhesRow);

            const selector = document.getElementById(`granularitySelector-${index}`);
            if (selector) { 
                selector.addEventListener('change', () => {
                    let granularity = selector.value;
                    criarGraficoFrequenciaCardiaca(index, granularity);
                });
            }
        });
    }
  
    window.ordenarTabela = function(idpos, chave) {
        if (ordem.chave === chave) {
            ordem.direcao = ordem.direcao === 'asc' ? 'desc' : 'asc';
        } else {
            ordem.chave = chave;
            ordem.direcao = 'asc';
        }
        
        let icones = document.getElementsByClassName('geral');
        for(let i = 0; i < icones.length; i++) {
            icones[i].classList.remove('fa-sort-asc', 'fa-sort-desc');
        }

        const currentIcon = document.getElementById(idpos);
        if (currentIcon) {
            currentIcon.classList.add(ordem.direcao === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc');
        }

        pacientes.sort((a, b) => {
            const valorA = a[chave];
            const valorB = b[chave];

            if (typeof valorA === 'string' && typeof valorB === 'string') {
                return ordem.direcao === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
            } else {
                if (valorA < valorB) {
                    return ordem.direcao === 'asc' ? -1 : 1;
                }
                if (valorA > valorB) {
                    return ordem.direcao === 'asc' ? 1 : -1;
                }
                return 0;
            }
        });
        renderPacientes(pacientes);
    };
  
    window.toggleDetalhes = function(index) {
        const detalhes = document.getElementById(`detalhes-${index}`);
        detalhes.classList.toggle('hidden');
        if (!detalhes.classList.contains('hidden')) {
            const selector = document.getElementById(`granularitySelector-${index}`);
            if (selector) {
                selector.value = 'daily5MinAvg'; 
                criarGraficoFrequenciaCardiaca(index, 'daily5MinAvg'); 
            } else {
                criarGraficoFrequenciaCardiaca(index, 'daily5MinAvg'); 
            }
        }
    }
  
    document.getElementById('nome').addEventListener('input', buscarPaciente);

    function buscarPaciente() {
        const nome = document.getElementById('nome').value.toLowerCase();
        const pacientesFiltrados = pacientes.filter(paciente => paciente.nome.toLowerCase().includes(nome));
        renderPacientes(pacientesFiltrados);
    }
  
    function toggleAll(evt) {
        let flagOcultar; 
        if (evt.target.innerText == 'Expandir') {
            evt.target.innerText = 'Recolher';
            flagOcultar = false; 
        } else {
          evt.target.innerText = 'Expandir';
          flagOcultar = true; 
        }
          
        let cont = document.getElementsByClassName('detalhes-container');
        for(let i = 0; i < cont.length; i++) {
          if ( flagOcultar ) {
            cont[i].classList.add('hidden');  
          } else {
            cont[i].classList.remove('hidden');    
            const selector = document.getElementById(`granularitySelector-${i}`);
            if (selector) {
                selector.value = 'daily5MinAvg'; 
                criarGraficoFrequenciaCardiaca(i, 'daily5MinAvg'); 
            } else {
                criarGraficoFrequenciaCardiaca(i, 'daily5MinAvg'); 
            }
          }
        }
    }
    
    document.getElementById('expandir-todos').addEventListener('click', toggleAll);

    function getHeartRateChartData(index, granularity) {
        const paciente = pacientes[index];
        let labels, data;
        let unit = 'hour'; 
        let tooltipFormat = 'HH:mm:ss'; 
        let displayFormat = 'HH'; 

        if (granularity === 'daily5MinAvg') {
            labels = paciente.heartRateChart.daily5MinAvg.label;
            data = paciente.heartRateChart.daily5MinAvg.data;
            unit = 'hour'; 
            displayFormat = 'HH'; 
        } else if (granularity === 'oneHourMin' && paciente.id === 1) { 
            labels = paciente.heartRateChart.oneHourMin.label;
            data = paciente.heartRateChart.oneHourMin.data;
            unit = 'minute'; 
            displayFormat = 'HH:mm'; 
            tooltipFormat = 'HH:mm:ss'; 
        } else { 
            labels = paciente.heartRateChart.hourly.label;
            data = paciente.heartRateChart.hourly.data;
            unit = 'hour';
            displayFormat = 'HH';
        }

        return {
            labels: labels,
            data: data,
            unit: unit,
            displayFormat: displayFormat,
            tooltipFormat: tooltipFormat
        };
    }
        
    function criarGraficoFrequenciaCardiaca(index, granularity) {
        let chartData = getHeartRateChartData(index, granularity);
        const ctxHeartRate = document.getElementById(`heartRateChartCanvas-${index}`).getContext('2d');
          
        if (heartRateChartInstance[index] !== undefined) {
            heartRateChartInstance[index].destroy(); 
        }

        heartRateChartInstance[index] = new Chart(ctxHeartRate, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Frequência Cardíaca (BPM)',
                    data: chartData.data,
                    borderColor: 'red',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time', 
                        time: {
                            unit: chartData.unit, 
                            displayFormats: {
                                [chartData.unit]: chartData.displayFormat 
                            },
                            tooltipFormat: chartData.tooltipFormat 
                        },
                        title: {
                            display: true,
                            text: 'Horas do Dia' 
                        },
                         ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        }
                    },
                    y: {
                        min: 20, 
                        max: 220, 
                        title: {
                            display: true,
                            text: 'Frequência Cardíaca (BPM)'
                        },
                        beginAtZero: false 
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Histórico de Frequência Cardíaca (Horas do Dia)' 
                    }
                }
            }
        });
    }
  
    buscarPaciente();
    setTimeout(function() { 
        ordenarTabela('sort-nome', 'nome');
    }, 500);
});