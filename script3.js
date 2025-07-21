document.addEventListener('DOMContentLoaded', function() {
    moment.locale('pt-br', {
        months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
        monthsShort : 'jan._fev._mar._abr._mai._jun._jul._ago._set._out._nov._dez.'.split('_'),
        weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
        weekdaysShort : 'dom._seg._ter._qua._qui._sex._sáb.'.split('_'),
        weekdaysMin : 'Do_Sg_Tç_Qa_Qi_Sx_Sb'.split('_')
    });

    var heartRateChartInstance = [];
    const patientChartStates = new Map();


    function generateAnaCostaHourlyData() {
        const labels = [];
        const data = [];
        for (let h = 0; h < 24; h++) {
            const hourStr = String(h).padStart(2, '0');
            labels.push(`2025-01-01T${hourStr}:00:00`);

            let bpm;
            if (h === 18) {
                bpm = null; 
            } else if (h >= 0 && h < 7) { 
                bpm = Math.floor(Math.random() * (70 - 50 + 1)) + 50; 
            } else if (h >= 15 && h < 17) { 
                bpm = Math.floor(Math.random() * (140 - 120 + 1)) + 120;
            } else { 
                bpm = Math.floor(Math.random() * (90 - 70 + 1)) + 70; 
            }
            data.push(bpm);
        }
        return { label: labels, data: data };
    }

    const pacientes = [
    {
        id: 0,
        nome: 'João Silva',
        idade: 45,
        peso: '95 kg',
        altura: '1,78 m',
        heartRateChart: {
            daily: {
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [72, 75, 74, 73, 76, 78, 77, 75]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [74, 75, 73, 72, 76]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
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
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [90, 92, 95, 88, 89, 91, 92, 90]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [92, 90, 91, 93, 90]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
                data: [89, 90, 91, 92, 90]
            },
            hourly: generateAnaCostaHourlyData(),
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
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [78, 80, 76, 75, 79, 77, 76, 78]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [77, 78, 76, 75, 78]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
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
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [75, 76, 77, 78, 76, 75, 77, 76]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [76, 75, 77, 76, 78]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
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
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [70, 72, 71, 70, 69, 71, 70, 69]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [71, 70, 72, 71, 69]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
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
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [76, 77, 78, 77, 76, 78, 76, 77]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [77, 76, 78, 77, 76]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
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
                label: ['2025-01-01T00:00:00', '2025-01-01T03:00:00', '2025-01-01T06:00:00', '2025-01-01T09:00:00', '2025-01-01T12:00:00', '2025-01-01T15:00:00', '2025-01-01T18:00:00', '2025-01-01T21:00:00'],
                data: [180, 182, 185, 183, 186, 184, 182, 180]
            },
            monthly: {
                label: ['2025-01-01T00:00:00', '2025-02-01T00:00:00', '2025-03-01T00:00:00', '2025-04-01T00:00:00', '2025-05-01T00:00:00'],
                data: [182, 181, 183, 180, 184]
            },
            weekly: {
                label: ['2025-01-01T00:00:00', '2025-01-08T00:00:00', '2025-01-15T00:00:00', '2025-01-22T00:00:00', '2025-01-29T00:00:00'],
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
                fiveMinData.push(valueForInterval === null ? null : Math.round(valueForInterval + (Math.random() * 6 - 3)));
            }
        }
        return { label: fiveMinLabels, data: fiveMinData };
    }

    function generate1MinData(hourlyData, hourlyLabels) {
        const oneMinLabels = [];
        const oneMinData = [];

        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 1) { 
                const hourStr = String(h).padStart(2, '0');
                const minuteStr = String(m).padStart(2, '0');
                oneMinLabels.push(`2025-01-01T${hourStr}:${minuteStr}:00`);

                let valueForInterval;
                const exactHourlyLabel = `2025-01-01T${hourStr}:00:00`;
                const exactHourlyIndex = hourlyLabels.indexOf(exactHourlyLabel);

                if (exactHourlyIndex !== -1) {
                    valueForInterval = hourlyData[exactHourlyIndex];
                } else {
                    let lastKnownValue = hourlyData[0];
                    for(let i = 0; i < hourlyLabels.length; i++) {
                        const currentLabelMoment = moment(hourlyLabels[i]);
                        const targetMoment = moment(`2025-01-01T${hourStr}:${minuteStr}:00`);
                        if (currentLabelMoment.isSameOrBefore(targetMoment, 'hour')) {
                            lastKnownValue = hourlyData[i];
                        } else {
                            break;
                        }
                    }
                    valueForInterval = lastKnownValue;
                }
                oneMinData.push(valueForInterval === null ? null : Math.round(valueForInterval + (Math.random() * 6 - 3)));
            }
        }
        return { label: oneMinLabels, data: oneMinData };
    }


    pacientes.forEach(paciente => {
        const { label: hourlyLabels, data: hourlyData } = paciente.heartRateChart.hourly;
        const fiveMinData = generate5MinData(hourlyData, hourlyLabels);
        paciente.heartRateChart.daily5MinAvg = fiveMinData;

        const oneMinData = generate1MinData(hourlyData, hourlyLabels);
        paciente.heartRateChart.oneMinAvg = oneMinData; 
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

    function calcularMediana(arr) {
        const filteredArr = arr.filter(value => value !== null && value !== undefined);

        if (filteredArr.length === 0) {
            return 'N/A';
        }

        const sortedArr = filteredArr.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedArr.length / 2);

        if (sortedArr.length % 2 === 0) {
            return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
        } else {
            return sortedArr[mid];
        }
    }

    function calcularIMC(pesoStr, alturaStr) {
        const pesoKg = parseFloat(pesoStr.replace(' kg', ''));
        const alturaM = parseFloat(alturaStr.replace(' m', '').replace(',', '.'));

        if (isNaN(pesoKg) || isNaN(alturaM) || alturaM === 0) {
            return { imc: 'N/A', classificacao: 'Dados inválidos' };
        }

        let imc = pesoKg / (alturaM * alturaM); 

        const imcParaClassificacao = parseFloat(imc.toFixed(1));

        let classificacao = '';

        if (imcParaClassificacao < 18.5) {
            classificacao = 'Abaixo do peso';
        } else if (imcParaClassificacao >= 18.5 && imcParaClassificacao <= 24.9) {
            classificacao = 'Peso normal';
        } else if (imcParaClassificacao >= 25.0 && imcParaClassificacao <= 29.9) { 
            classificacao = 'Sobrepeso';
        } else if (imcParaClassificacao >= 30.0 && imcParaClassificacao <= 34.9) { 
            classificacao = 'Obesidade Grau I';
        } else if (imcParaClassificacao >= 35.0 && imcParaClassificacao <= 39.9) { 
            classificacao = 'Obesidade Grau II';
        } else {
            classificacao = 'Obesidade Grau III'; 
        }
        return { imc: imcParaClassificacao.toFixed(1), classificacao: classificacao };
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
            if (!patientChartStates.has(index)) {
                patientChartStates.set(index, {
                    currentSelectedGranularity: 'daily5MinAvg', 
                    currentDisplayedDate: moment('2025-01-01'), 
                    customIntervalStart: null,
                    customIntervalEnd: null
                });
            }
            const patientState = patientChartStates.get(index);

            const hourlyData = paciente.heartRateChart.hourly.data;
            const fcAtual = hourlyData.slice().reverse().find(dataPoint => dataPoint !== null);
            const validHourlyData = hourlyData.filter(d => d !== null && d !== undefined); 
            const fcMax24h = validHourlyData.length > 0 ? Math.max(...validHourlyData) : 'N/A';
            const fcMin24h = validHourlyData.length > 0 ? Math.min(...validHourlyData) : 'N/A';

            const imcResult = calcularIMC(paciente.peso, paciente.altura);


            const fcMediana24h = calcularMediana(hourlyData); 

            paciente.fcAtual = fcAtual;
        
            paciente.fcMediana24h = typeof fcMediana24h === 'number' ? parseFloat(fcMediana24h.toFixed(1)) : fcMediana24h;
            paciente.fcMax24h = fcMax24h;
            paciente.fcMin24h = fcMin24h;

            let fcAtualClass = fcAtual > 180 ? ' alerta-fc-atual' : '';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.nome}</td>
                <td>${paciente.idade}</td>
                <td class="${fcAtualClass.trim()}">${fcAtual !== undefined ? fcAtual + ' BPM' : 'N/A'}</td>
                <td>${typeof fcMediana24h === 'number' ? fcMediana24h.toFixed(1) + ' BPM' : 'N/A'}</td>
                <td>${fcMax24h !== 'N/A' ? fcMax24h + ' BPM' : 'N/A'}</td>
                <td>${fcMin24h !== 'N/A' ? fcMin24h + ' BPM' : 'N/A'}</td>
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
                                  <span>Nome / Idade:</span>
                                  <span class="value">${paciente.nome} (${paciente.idade} anos)</span>
                                </div>
                                <div class="item">
                                  <span>Peso / Estatura:</span>
                                  <span class="value">${paciente.peso} / ${paciente.altura}</span>
                                </div>
                                <div class="item">
                                  <span>IMC:</span>
                                  <span class="value">${imcResult.imc}</span>
                                  <span class="unit">${imcResult.classificacao}</span>
                                </div>
                                <div class="item">
                                  <span>Frequência Cardíaca:</span>
                                  <span class="value">${fcAtual !== undefined ? fcAtual : 'N/A'}</span>
                                  <span class="unit">BPM</span>
                                </div>
                            </div>
                            <div class="center-section">
                                <div class="chart-top-area">
                                    <button class="date-nav-button date-nav-left" data-action="prev" data-index="${index}">&lt;</button>
                                    <span id="currentDateDisplay-${index}" class="date-display"></span>
                                    <button class="date-nav-button date-nav-right" data-action="next" data-index="${index}">&gt;</button>
                                    <div class="status-indicator-container" id="statusIndicator-${index}">
                                        <span class="status-circle" id="statusCircle-${index}"></span>
                                        <span class="status-text" id="statusText-${index}"></span>
                                    </div>
                                </div>
                                <div class="chart-granularity-buttons" style="margin-top: 10px; margin-bottom: 20px; display: flex; gap: 10px;">
                                    <button class="granularity-button" data-granularity="daily5MinAvg" data-index="${index}">Últimas 24h</button>
                                    <button class="granularity-button" data-granularity="last4HoursMinAvg" data-index="${index}">Últimas 4h</button>
                                    <button class="granularity-button" data-granularity="customInterval" data-index="${index}">Definir Intervalo</button>
                                </div>
                                <div class="custom-interval-controls hidden" id="customIntervalControls-${index}">
                                    <div>
                                        <label for="startTime-${index}">Início:</label>
                                        <input type="time" id="startTime-${index}" value="00:00">
                                    </div>
                                    <div>
                                        <label for="endTime-${index}">Fim:</label>
                                        <input type="time" id="endTime-${index}" value="00:00">
                                    </div>
                                    <button id="generateChartBtn-${index}">Gerar Gráfico</button>
                                    <span class="custom-interval-info">(intervalo máximo de 4h)</span>
                                </div>
                                <div class="chart-metrics-header">
                                    <div class="chart-header-item">
                                        <span class="value" id="range-fc-${index}"></span>
                                        <span class="label">Faixa de frequência cardíaca</span>
                                    </div>
                                    <div class="chart-header-item last-update">
                                        <span class="value" id="last-update-${index}"></span>
                                        <span class="label">Última atualização</span>
                                    </div>
                                </div>
                                <div class="charts charts-${index}" id="charts-${index}">
                                    <canvas id="heartRateChartCanvas-${index}"></canvas>
                                    <div id="customTooltip-${index}" class="custom-chart-tooltip hidden">
                                        <div class="tooltip-data-line">
                                            <span class="tooltip-value" id="tooltip-fc-${index}"></span>
                                            <span class="tooltip-unit">bpm</span>
                                        </div>
                                        <div class="tooltip-date" id="tooltip-time-${index}"></div>
                                        <div class="tooltip-arrow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            tabela.appendChild(detalhesRow);

            const dateNavButtons = detalhesRow.querySelectorAll(`.date-nav-button[data-index="${index}"]`);
            const dateDisplayElement = document.getElementById(`currentDateDisplay-${index}`);
            const customIntervalControls = document.getElementById(`customIntervalControls-${index}`);
            const startTimeInput = document.getElementById(`startTime-${index}`);
            const endTimeInput = document.getElementById(`endTime-${index}`);
            const generateChartBtn = document.getElementById(`generateChartBtn-${index}`);

            const statusCircle = detalhesRow.querySelector(`#statusCircle-${index}`);
            const statusText = detalhesRow.querySelector(`#statusText-${index}`);

            const lastHourlyLabel = paciente.heartRateChart.hourly.label[paciente.heartRateChart.hourly.label.length - 1];
            const lastDataMoment = moment(lastHourlyLabel);
            const currentTime = moment(); 

            const minutesDiff = currentTime.diff(lastDataMoment, 'minutes');
            
            const isOnline = minutesDiff <= 10;

            if (statusCircle && statusText) {
                if (isOnline) {
                    statusCircle.classList.add('online');
                    statusCircle.classList.remove('offline');
                    statusText.innerText = 'Online';
                } else {
                    statusCircle.classList.add('offline');
                    statusCircle.classList.remove('online');
                    statusText.innerText = 'Offline';
                }
            }



            function updateDateDisplayAndChart() {
                if (patientState.currentSelectedGranularity === 'customInterval') {
                    dateNavButtons.forEach(btn => btn.classList.add('hidden'));
                    dateDisplayElement.classList.add('hidden');
                    customIntervalControls.classList.remove('hidden');
                } else {
                    dateNavButtons.forEach(btn => btn.classList.remove('hidden'));
                    dateDisplayElement.classList.remove('hidden');
                    customIntervalControls.classList.add('hidden');
                    dateDisplayElement.innerText = patientState.currentDisplayedDate.format('D [de] MMM. (ddd).');
                }

                let chartData;
                if (patientState.currentSelectedGranularity === 'customInterval') {
                    chartData = getHeartRateChartData(index, patientState.currentSelectedGranularity, patientState.currentDisplayedDate, patientState.customIntervalStart, patientState.customIntervalEnd);
                } else {
                    chartData = getHeartRateChartData(index, patientState.currentSelectedGranularity, patientState.currentDisplayedDate);
                }

                criarGraficoFrequenciaCardiaca(index, patientState.currentSelectedGranularity, patientState.currentDisplayedDate, patientState.customIntervalStart, patientState.customIntervalEnd);


                const rangeFcElement = document.getElementById(`range-fc-${index}`);
                const lastUpdateElement = document.getElementById(`last-update-${index}`);

                const currentChartDataValues = chartData.data.filter(val => val !== null && val !== undefined);

                let minFc = 'N/A';
                let maxFc = 'N/A';
                if (currentChartDataValues.length > 0) {
                    minFc = Math.min(...currentChartDataValues);
                    maxFc = Math.max(...currentChartDataValues);
                }

                if (rangeFcElement) {
                    rangeFcElement.innerText = `${minFc !== 'N/A' ? minFc : 'N/A'}-${maxFc !== 'N/A' ? maxFc : 'N/A'} bpm`;
                }

                if (lastUpdateElement) {
                    let lastDisplayTime = 'N/A';
                    if (chartData.labels.length > 0) {
                        let lastValidDataIndex = -1;
                        for (let i = chartData.data.length - 1; i >= 0; i--) {
                            if (chartData.data[i] !== null && chartData.data[i] !== undefined) {
                                lastValidDataIndex = i;
                                break;
                            }
                        }
                        if (lastValidDataIndex !== -1) {
                            lastDisplayTime = moment(chartData.labels[lastValidDataIndex]).format('HH:mm');
                        }
                    }
                    lastUpdateElement.innerText = lastDisplayTime;
                }

                const granularityButtons = detalhesRow.querySelectorAll(`.granularity-button[data-index="${index}"]`);
                granularityButtons.forEach(btn => {
                    if (btn.dataset.granularity === patientState.currentSelectedGranularity) {
                        btn.classList.add('selected-granularity');
                    } else {
                        btn.classList.remove('selected-granularity');
                    }
                });
            }

            const prevButton = detalhesRow.querySelector(`.date-nav-left[data-index="${index}"]`);
            const nextButton = detalhesRow.querySelector(`.date-nav-right[data-index="${index}"]`);

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    patientState.currentDisplayedDate.subtract(1, 'days');
                    updateDateDisplayAndChart();
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    patientState.currentDisplayedDate.add(1, 'days');
                    updateDateDisplayAndChart();
                });
            }

            const granularityButtons = detalhesRow.querySelectorAll(`.granularity-button[data-index="${index}"]`);
            granularityButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    patientState.currentSelectedGranularity = event.target.dataset.granularity; 
                    updateDateDisplayAndChart(); 
                });
            });

            generateChartBtn.addEventListener('click', () => {
                const startHourMin = startTimeInput.value;
                const endHourMin = endTimeInput.value;

                if (!startHourMin || !endHourMin) {
                    alert('Por favor, insira as horas de início e fim.');
                    return;
                }

                const today = moment('2025-01-01'); 
                const startMoment = moment(today.format('YYYY-MM-DD') + 'T' + startHourMin + ':00');
                const endMoment = moment(today.format('YYYY-MM-DD') + 'T' + endHourMin + ':00');

                if (endMoment.isSameOrBefore(startMoment)) {
                    alert('A hora de fim deve ser depois da hora de início.');
                    return;
                }

                const duration = moment.duration(endMoment.diff(startMoment));
                const hoursDiff = duration.asHours();

                if (hoursDiff > 4) {
                    alert('O intervalo máximo permitido é de 4 horas.');
                    return;
                }

                patientState.customIntervalStart = startMoment;
                patientState.customIntervalEnd = endMoment;
                patientState.currentSelectedGranularity = 'customInterval'; 
                updateDateDisplayAndChart();
            });


            updateDateDisplayAndChart()
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
                return ordem.direcao === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(a);
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
            const chartMetricsHeader = detalhes.querySelector('.chart-metrics-header');
            if (chartMetricsHeader) {
                chartMetricsHeader.classList.remove('hidden');
            }

            const patientState = patientChartStates.get(index);
            if (patientState) {
                patientState.currentSelectedGranularity = 'daily5MinAvg';
                patientState.currentDisplayedDate = moment('2025-01-01'); 

                const detalhesElement = document.getElementById(`detalhes-${index}`);
                const dateNavButtons = detalhesElement.querySelectorAll(`.date-nav-button[data-index="${index}"]`);
                const dateDisplayElement = document.getElementById(`currentDateDisplay-${index}`);
                const customIntervalControls = document.getElementById(`customIntervalControls-${index}`);

                dateNavButtons.forEach(btn => btn.classList.remove('hidden'));
                dateDisplayElement.classList.remove('hidden');
                customIntervalControls.classList.add('hidden');
                dateDisplayElement.innerText = patientState.currentDisplayedDate.format('D [de] MMM. (ddd).');

                updateDateDisplayAndChart(); //

                const granularityButtons = detalhesElement.querySelectorAll(`.granularity-button[data-index="${index}"]`);
                granularityButtons.forEach(btn => {
                    if (btn.dataset.granularity === 'daily5MinAvg') {
                        btn.classList.add('selected-granularity');
                    } else {
                        btn.classList.remove('selected-granularity');
                    }
                });
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
            const chartMetricsHeader = cont[i].querySelector('.chart-metrics-header');
            if (chartMetricsHeader) {
                chartMetricsHeader.classList.remove('hidden');
            }
            const patientState = patientChartStates.get(i);
            if (patientState) {
                patientState.currentSelectedGranularity = 'daily5MinAvg';
                patientState.currentDisplayedDate = moment('2025-01-01'); 

                const detalhesElement = document.getElementById(`detalhes-${i}`);
                const dateNavButtons = detalhesElement.querySelectorAll(`.date-nav-button[data-index="${i}"]`);
                const dateDisplayElement = document.getElementById(`currentDateDisplay-${i}`);
                const customIntervalControls = document.getElementById(`customIntervalControls-${i}`);

                dateNavButtons.forEach(btn => btn.classList.remove('hidden'));
                dateDisplayElement.classList.remove('hidden');
                customIntervalControls.classList.add('hidden');
                dateDisplayElement.innerText = patientState.currentDisplayedDate.format('D [de] MMM. (ddd).');

                updateDateDisplayAndChart(); 

                const granularityButtons = detalhesElement.querySelectorAll(`.granularity-button[data-index="${i}"]`);
                granularityButtons.forEach(btn => {
                    if (btn.dataset.granularity === 'daily5MinAvg') {
                        btn.classList.add('selected-granularity');
                    } else {
                        btn.classList.remove('selected-granularity');
                    }
                });
            }
          }
        }
    }

    document.getElementById('expandir-todos').addEventListener('click', toggleAll);

    function getHeartRateChartData(index, granularity, selectedDate, customStart = null, customEnd = null) {
        const paciente = pacientes[index];
        let labels, data;
        let unit = 'hour';
        let tooltipFormat = 'HH:mm:ss';
        let displayFormat = 'HH:mm';

        if (granularity !== 'customInterval' && selectedDate.format('YYYY-MM-DD') !== '2025-01-01') {
            return {
                labels: [],
                data: [],
                unit: unit,
                displayFormat: displayFormat,
                tooltipFormat: tooltipFormat
            };
        }

        if (granularity === 'daily5MinAvg') {
            labels = paciente.heartRateChart.daily5MinAvg.label;
            data = paciente.heartRateChart.daily5MinAvg.data;
            unit = 'hour';
            displayFormat = 'HH:mm';
        } else if (granularity === 'last4HoursMinAvg') { 
            const fullOneMinLabels = paciente.heartRateChart.oneMinAvg.label;
            const fullOneMinData = paciente.heartRateChart.oneMinAvg.data;

            let lastDataPointTime = null;
            for (let i = fullOneMinLabels.length - 1; i >= 0; i--) {
                if (fullOneMinData[i] !== null && fullOneMinData[i] !== undefined) {
                    lastDataPointTime = moment(fullOneMinLabels[i]);
                    break;
                }
            }

            if (!lastDataPointTime) {
                return { labels: [], data: [], unit: 'minute', displayFormat: 'HH:mm', tooltipFormat: 'HH:mm:ss' };
            }

            const endTime = lastDataPointTime;
            const startTime = moment(endTime).subtract(4, 'hours'); 

            labels = [];
            data = [];

            for (let i = 0; i < fullOneMinLabels.length; i++) {
                const pointTime = moment(fullOneMinLabels[i]);
                if (pointTime.isSameOrAfter(startTime) && pointTime.isSameOrBefore(endTime)) {
                    labels.push(fullOneMinLabels[i]);
                    data.push(fullOneMinData[i]);
                }
            }

            unit = 'minute';
            displayFormat = 'HH:mm';
            tooltipFormat = 'HH:mm:ss';
        } else if (granularity === 'customInterval') {
            if (!customStart || !customEnd) {
                return { labels: [], data: [], unit: 'minute', displayFormat: 'HH:mm', tooltipFormat: 'HH:mm:ss' };
            }

            const fullOneMinLabels = paciente.heartRateChart.oneMinAvg.label;
            const fullOneMinData = paciente.heartRateChart.oneMinAvg.data;

            labels = [];
            data = [];

            for (let i = 0; i < fullOneMinLabels.length; i++) {
                const pointTime = moment(fullOneMinLabels[i]);
                if (pointTime.isSameOrAfter(customStart) && pointTime.isSameOrBefore(customEnd)) {
                    labels.push(fullOneMinLabels[i]);
                    data.push(fullOneMinData[i]);
                }
            }

            unit = 'minute';
            displayFormat = 'HH:mm';
            tooltipFormat = 'HH:mm:ss';
        }
        else if (granularity === 'oneHourMin' && paciente.id === 1) {
            labels = paciente.heartRateChart.oneHourMin.label;
            data = paciente.heartRateChart.oneHourMin.data;
            unit = 'minute';
            displayFormat = 'HH:mm';
            tooltipFormat = 'HH:mm:ss';
        } else { 
            labels = paciente.heartRateChart.hourly.label;
            data = paciente.heartRateChart.hourly.data;
            unit = 'hour';
            displayFormat = 'HH:mm';
        }

        return {
            labels: labels,
            data: data,
            unit: unit,
            displayFormat: displayFormat,
            tooltipFormat: tooltipFormat
        };
    }

    function criarGraficoFrequenciaCardiaca(index, granularity, currentDate, customStart = null, customEnd = null) {
       
        let chartData = getHeartRateChartData(index, granularity, currentDate, customStart, customEnd);
        const canvas = document.getElementById(`heartRateChartCanvas-${index}`);
        const ctxHeartRate = canvas.getContext('2d');

        if (heartRateChartInstance[index] !== undefined) {
            heartRateChartInstance[index].destroy();
        }

        const gradient = ctxHeartRate.createLinearGradient(0, 0, 0, canvas.clientHeight);
        gradient.addColorStop(0, 'rgba(255, 99, 132, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');

        heartRateChartInstance[index] = new Chart(ctxHeartRate, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Frequência Cardíaca (BPM)',
                    data: chartData.data,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: gradient,
                    fill: true,
                    pointRadius: 0, 
                    spanGaps: false, 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                            display: false,
                        },
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 8,
                            color: '#888'
                        },
                        grid: {
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        position: 'left',
                        min: 20,
                        max: 220,
                        title: {
                            display: false,
                        },
                        beginAtZero: false,
                        ticks: {
                            stepSize: 50,
                            color: '#888'
                        },
                        grid: {
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false,
                        mode: 'nearest',
                        intersect: false,
                        external: function(context) {
                            const tooltipModel = context.tooltip;
                            const chartId = context.chart.canvas.id.replace('heartRateChartCanvas-', '');
                            const customTooltip = document.getElementById(`customTooltip-${chartId}`);
                            const chartMetricsHeader = document.querySelector(`#detalhes-${chartId} .chart-metrics-header`);

                            if (tooltipModel.opacity === 0) {
                                customTooltip.classList.add('hidden');
                                if (chartMetricsHeader) {
                                    chartMetricsHeader.classList.remove('hidden'); 
                                }
                                return;
                            }

                            customTooltip.classList.remove('hidden');
                            if (chartMetricsHeader) {
                                chartMetricsHeader.classList.add('hidden'); 
                            }

                            if (tooltipModel.body && tooltipModel.dataPoints.length > 0) {
                                const dataPoint = tooltipModel.dataPoints[0];
                                const fcValue = dataPoint.parsed.y;
                                const timestampMoment = moment(dataPoint.parsed.x);
                                const formattedDate = timestampMoment.format('D [de] MMM. HH:mm'); 

                                document.getElementById(`tooltip-fc-${chartId}`).innerText = fcValue;
                                document.getElementById(`tooltip-time-${chartId}`).innerText = formattedDate;
                            } else {
                                document.getElementById(`tooltip-fc-${chartId}`).innerText = '';
                                document.getElementById(`tooltip-time-${chartId}`).innerText = '';
                            }

                            const canvas = context.chart.canvas;
                            const tooltipWidth = customTooltip.offsetWidth;
                            const tooltipHeight = customTooltip.offsetHeight;

                            const caretX = tooltipModel.caretX;
                            const caretY = tooltipModel.caretY;

                            let finalLeft = caretX - (tooltipWidth / 2);
                            let finalTop = caretY - tooltipHeight - 15;

                            finalLeft += canvas.offsetLeft;
                            finalTop += canvas.offsetTop;

                           
                            if (finalLeft < canvas.offsetLeft) { 
                                finalLeft = canvas.offsetLeft;
                            }
                            else if (finalLeft + tooltipWidth > canvas.offsetLeft + canvas.offsetWidth) {
                                finalLeft = canvas.offsetLeft + canvas.offsetWidth - tooltipWidth;
                            }
                            
                            if (finalTop < canvas.offsetTop) {
                                finalTop = canvas.offsetTop;
                            }

                            customTooltip.style.left = `${finalLeft}px`;
                            customTooltip.style.top = `${finalTop}px`;
                            customTooltip.style.position = 'absolute';
                            customTooltip.style.pointerEvents = 'none';
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 5,
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'white',
                        borderWidth: 2
                    },
                    line: {
                        tension: 0.4
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                }
            }
        });
    }

    buscarPaciente();
    setTimeout(function() {
        ordenarTabela('sort-nome', 'nome');
    }, 500);
});