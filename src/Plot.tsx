import React, {useState} from 'react';
import * as d3 from 'd3';

const data = {
    "oqs_sig_default": {
        "kyber512": 3858.54,
        "kyber768": 3665.62,
        "kyber1024": 3884.38,
        "ntru_hps2048509": 3384.72,
        "ntru_hps2048677": 2918.75,
        "ntru_hps4096821": 2683.75,
        "ntru_hrss701": 2692.77,
        "lightsaber": 3282.19,
        "saber": 2676.47,
        "firesaber": 2243.68,
        "kyber90s512": 4262.71,
        "kyber90s768": 4085.25,
        "kyber90s1024": 4119.35
    },
    "p256_oqs_sig_default": {
        "kyber512": 3310,
        "kyber768": 2901.45,
        "kyber1024": 2560.81,
        "ntru_hps2048509": 2764.29,
        "ntru_hps2048677": 2220.24,
        "ntru_hps4096821": 1990.91,
        "ntru_hrss701": 2122.09,
        "lightsaber": 2481.25,
        "saber": 2267.06,
        "firesaber": 1835.42,
        "kyber90s512": 3065.15,
        "kyber90s768": 3226.23,
        "kyber90s1024": 3514.04
    },
    "rsa3072_oqs_sig_default": {
        "kyber512": 3472.73,
        "kyber768": 2840,
        "kyber1024": 2800,
        "ntru_hps2048509": 2963.16,
        "ntru_hps2048677": 2439.13,
        "ntru_hps4096821": 2103.85,
        "ntru_hrss701": 2366.67,
        "lightsaber": 2947.37,
        "saber": 2270.83,
        "firesaber": 1942.86,
        "kyber90s512": 3382.35,
        "kyber90s768": 3512.5,
        "kyber90s1024": 3177.78
    },
    "dilithium2": {
        "kyber512": 4191.53,
        "kyber768": 3795.38,
        "kyber1024": 3617.91,
        "ntru_hps2048509": 3469.44,
        "ntru_hps2048677": 2834.94,
        "ntru_hps4096821": 2557.65,
        "ntru_hrss701": 2750,
        "lightsaber": 3600,
        "saber": 2708.43,
        "firesaber": 2027.84,
        "kyber90s512": 4580,
        "kyber90s768": 4341.38,
        "kyber90s1024": 4163.33
    },
    "p256_dilithium2": {
        "kyber512": 3141.54,
        "kyber768": 3043.94,
        "kyber1024": 3326.67,
        "ntru_hps2048509": 2486.08,
        "ntru_hps2048677": 2171.59,
        "ntru_hps4096821": 2064.71,
        "ntru_hrss701": 2067.42,
        "lightsaber": 2836.62,
        "saber": 1975,
        "firesaber": 1872.34,
        "kyber90s512": 3710.71,
        "kyber90s768": 3231.75,
        "kyber90s1024": 2777.78
    },
    "rsa3072_dilithium2": {
        "kyber512": 3333.33,
        "kyber768": 3005.26,
        "kyber1024": 3352.94,
        "ntru_hps2048509": 2790,
        "ntru_hps2048677": 2316.67,
        "ntru_hps4096821": 2029.63,
        "ntru_hrss701": 2204,
        "lightsaber": 3233.33,
        "saber": 2329.17,
        "firesaber": 1882.76,
        "kyber90s512": 3773.33,
        "kyber90s768": 3773.33,
        "kyber90s1024": 3010.53
    },
    "dilithium3": {
        "kyber512": 4361.54,
        "kyber768": 3493.94,
        "kyber1024": 3408.96,
        "ntru_hps2048509": 3332.84,
        "ntru_hps2048677": 2709.76,
        "ntru_hps4096821": 2460.49,
        "ntru_hrss701": 2567.07,
        "lightsaber": 3548.44,
        "saber": 2746.84,
        "firesaber": 2018.95,
        "kyber90s512": 4448.08,
        "kyber90s768": 4340.74,
        "kyber90s1024": 4133.93
    },
    "p256_dilithium3": {
        "kyber512": 3524.53,
        "kyber768": 2920.59,
        "kyber1024": 2830.88,
        "ntru_hps2048509": 2540.85,
        "ntru_hps2048677": 2082.76,
        "ntru_hps4096821": 1866.28,
        "ntru_hrss701": 1496.63,
        "lightsaber": 2119.18,
        "saber": 1979.35,
        "firesaber": 1793.55,
        "kyber90s512": 2917.19,
        "kyber90s768": 2558.67,
        "kyber90s1024": 2747.69
    },
    "rsa3072_dilithium3": {
        "kyber512": 3107.69,
        "kyber768": 2785,
        "kyber1024": 2670,
        "ntru_hps2048509": 2609.52,
        "ntru_hps2048677": 2237.5,
        "ntru_hps4096821": 1974.07,
        "ntru_hrss701": 2112,
        "lightsaber": 2790,
        "saber": 2146.15,
        "firesaber": 1803.45,
        "kyber90s512": 3147.06,
        "kyber90s768": 3305.88,
        "kyber90s1024": 2795
    },
    "dilithium4": {
        "kyber512": 3680.33,
        "kyber768": 3396.97,
        "kyber1024": 3182.86,
        "ntru_hps2048509": 3080.28,
        "ntru_hps2048677": 2620,
        "ntru_hps4096821": 2409.76,
        "ntru_hrss701": 2446.91,
        "lightsaber": 2906.58,
        "saber": 2452.94,
        "firesaber": 2142.35,
        "kyber90s512": 3718.03,
        "kyber90s768": 3443.75,
        "kyber90s1024": 3756.67
    },
    "p384_dilithium4": {
        "kyber512": 963.64,
        "kyber768": 924.69,
        "kyber1024": 931.71,
        "ntru_hps2048509": 901.23,
        "ntru_hps2048677": 839.53,
        "ntru_hps4096821": 815.12,
        "ntru_hrss701": 807.95,
        "lightsaber": 925.93,
        "saber": 890.48,
        "firesaber": 810.34,
        "kyber90s512": 950,
        "kyber90s768": 984.62,
        "kyber90s1024": 951.22
    },
    "falcon512": {
        "kyber512": 3800,
        "kyber768": 3966.67,
        "kyber1024": 3510,
        "ntru_hps2048509": 3510,
        "ntru_hps2048677": 2875,
        "ntru_hps4096821": 2043.75,
        "ntru_hrss701": 2414.29,
        "lightsaber": 2858.33,
        "saber": 2630.77,
        "firesaber": 1922.22,
        "kyber90s512": 4262.5,
        "kyber90s768": 3777.78,
        "kyber90s1024": 3580
    },
    "p256_falcon512": {
        "kyber512": 2423.08,
        "kyber768": 2160,
        "kyber1024": 2306.67,
        "ntru_hps2048509": 2160,
        "ntru_hps2048677": 2186.67,
        "ntru_hps4096821": 1844.44,
        "ntru_hrss701": 2175,
        "lightsaber": 2669.23,
        "saber": 1964.71,
        "firesaber": 1655,
        "kyber90s512": 2515.38,
        "kyber90s768": 2630.77,
        "kyber90s1024": 2883.33
    },
    "rsa3072_falcon512": {
        "kyber512": 2871.43,
        "kyber768": 2633.33,
        "kyber1024": 2644.44,
        "ntru_hps2048509": 2440,
        "ntru_hps2048677": 2360,
        "ntru_hps4096821": 1950,
        "ntru_hrss701": 1966.67,
        "lightsaber": 2655.56,
        "saber": 2136.36,
        "firesaber": 1635.71,
        "kyber90s512": 3025,
        "kyber90s768": 3025,
        "kyber90s1024": 2644.44
    },
    "falcon1024": {
        "kyber512": 3300,
        "kyber768": 2500,
        "kyber1024": 2485.71,
        "ntru_hps2048509": 2150,
        "ntru_hps2048677": 2485.71,
        "ntru_hps4096821": 1700,
        "ntru_hrss701": 2175,
        "lightsaber": 2471.43,
        "saber": 2175,
        "firesaber": 1922.22,
        "kyber90s512": 4500,
        "kyber90s768": 2933.33,
        "kyber90s1024": 2485.71
    },
    "p521_falcon1024": {
        "kyber512": 472,
        "kyber768": 488.46,
        "kyber1024": 481.48,
        "ntru_hps2048509": 500,
        "ntru_hps2048677": 420.69,
        "ntru_hps4096821": 503.85,
        "ntru_hrss701": 481.48,
        "lightsaber": 492.59,
        "saber": 485.19,
        "firesaber": 471.43,
        "kyber90s512": 503.85,
        "kyber90s768": 492.59,
        "kyber90s1024": 507.69
    },
    "rainbowIaclassic": {
        "kyber512": 437.97,
        "kyber768": 425.81,
        "kyber1024": 389.36,
        "ntru_hps2048509": 403.12,
        "ntru_hps2048677": 406.12,
        "ntru_hps4096821": 396.91,
        "ntru_hrss701": 415.79,
        "lightsaber": 424.18,
        "saber": 387.5,
        "firesaber": 378.22,
        "kyber90s512": 433.33,
        "kyber90s768": 411.7,
        "kyber90s1024": 433.7
    },
    "p256_rainbowIaclassic": {
        "kyber512": 407.5,
        "kyber768": 410.64,
        "kyber1024": 403.26,
        "ntru_hps2048509": 382.65,
        "ntru_hps2048677": 363.16,
        "ntru_hps4096821": 387.5,
        "ntru_hrss701": 383.16,
        "lightsaber": 405.32,
        "saber": 390.91,
        "firesaber": 367.33,
        "kyber90s512": 427.17,
        "kyber90s768": 425.27,
        "kyber90s1024": 418.28
    },
    "rsa3072_rainbowIaclassic": {
        "kyber512": 423.68,
        "kyber768": 393.85,
        "kyber1024": 403.12,
        "ntru_hps2048509": 411.11,
        "ntru_hps2048677": 414.29,
        "ntru_hps4096821": 400,
        "ntru_hrss701": 395.38,
        "lightsaber": 406.06,
        "saber": 400,
        "firesaber": 366.67,
        "kyber90s512": 401.59,
        "kyber90s768": 408.06,
        "kyber90s1024": 384.13
    },
    "rainbowVcclassic": {
        "kyber512": 25.76,
        "kyber768": 25.74,
        "kyber1024": 26,
        "ntru_hps2048509": 25.25,
        "ntru_hps2048677": 25,
        "ntru_hps4096821": 25.74,
        "ntru_hrss701": 26.47,
        "lightsaber": 24.49,
        "saber": 25.96,
        "firesaber": 26.53,
        "kyber90s512": 25.96,
        "kyber90s768": 26.47,
        "kyber90s1024": 26.26
    },
    "p521_rainbowVcclassic": {
        "kyber512": 25,
        "kyber768": 25.25,
        "kyber1024": 25.24,
        "ntru_hps2048509": 25,
        "ntru_hps2048677": 25,
        "ntru_hps4096821": 25.24,
        "ntru_hrss701": 25,
        "lightsaber": 25.49,
        "saber": 25.51,
        "firesaber": 25.51,
        "kyber90s512": 25.24,
        "kyber90s768": 25.25,
        "kyber90s1024": 25.24
    },
    "noName": {
        "kyber512": 25,
        "kyber768": 25.49,
        "kyber1024": 25.49,
        "ntru_hps2048509": 25.25,
        "ntru_hps2048677": 25.49,
        "ntru_hps4096821": 25.25,
        "ntru_hrss701": 25.25,
        "lightsaber": 24.76,
        "saber": 25,
        "firesaber": 25.25,
        "kyber90s512": 25.74,
        "kyber90s768": 25.25,
        "kyber90s1024": 25.49
    }
}

const sig=Object.entries(data)[0][0]
const sigs=Object.entries(data)

type dataEntry = [string, number];
type Props = {
}

const Plot: React.FC<Props> = () =>{
  const [chosenSig, setChosenSig]=useState<string>(sigs[0][0])
  //@ts-ignore
  const entriesAsList=Object.entries(data[chosenSig]).sort()

  const width=1000;
  const height=400;
  const marginLeft=20;
  const marginRight=10;
  const marginTop=10;
  const marginBottom=60;
  const boundedWidth=width-marginLeft-marginRight;
  const boundedHeight=height-marginTop-marginBottom;
  const barWidth = boundedWidth/13-2;
  const xAccessor=(d:dataEntry)=>d[0]
  const yAccessor=(d:dataEntry)=>d[1]
  //@ts-ignore
  const yScale = d3.scaleLinear().domain(d3.extent(entriesAsList, yAccessor))//gives us min max
    .range([0, boundedHeight-20])
    .nice()

  return(
    <>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {
        //@ts-ignore
        sigs.map(sig=><button onClick={(e:MouseEvent)=>setChosenSig(e.target.innerHTML)}>{sig[0]}</button>)
        }
      </div>
      <p style={{color: "white"}}>{chosenSig}</p>      
      <div className="plot">
        <svg style={{backgroundColor: "#282c34", borderRadius: "5px"}} width={width} height={height}>
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            {entriesAsList.map((entry, index)=>{
              //@ts-ignore
              const barHeight = yScale(yAccessor(entry))
              return(
                <g transform={`translate(${index/13*boundedWidth}, 0)`}>
                  //@ts-ignore
                  <rect style={{fill: "red"}} y={boundedHeight-barHeight} width={barWidth} height={barHeight} rx={5}></rect>
                  //@ts-ignore
                  <text style={{fontSize: "12px", fontWeight: "bold", textAnchor: "middle", fill: "red"}} x={barWidth/2} y={boundedHeight-barHeight-5}>{yAccessor(entry)}</text>
                  //@ts-ignore
                  <text style={{fill: "white", transformOrigin: "top left", transform: `translate(${barWidth/2}px, ${boundedHeight+10}px) rotate(-45deg)`, fontSize: "10px", fontWeight: "bold", textAnchor: "end"}}>{xAccessor(entry)}</text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </>
  );
}

export default Plot;
