export const getHashtagStyle = (word) => {
    const letterColorCombinations = [
      { bg: 'rgb(255,248,233)', text: 'rgb(121,74,12)', border: 'rgb(255,211,129)' },
      { bg: 'rgb(255,238,243)', text: 'rgb(218,20,59)', border: 'rgb(255,167,189)' },
      { bg: 'rgb(233,250,243)', text: 'rgb(0,89,52)', border: 'rgb(161,234,202)' },
      { bg: 'rgb(246,246,248)', text: 'rgb(53,54,67)', border: 'rgb(201,203,214)' },
      { bg: 'rgb(240,255,244)', text: 'rgb(0,128,0)', border: 'rgb(144,238,144)' },
      { bg: 'rgb(255,240,245)', text: 'rgb(199,21,133)', border: 'rgb(255,182,193)' },
      { bg: 'rgb(240,248,255)', text: 'rgb(0,0,139)', border: 'rgb(135,206,250)' },
      { bg: 'rgb(255,250,240)', text: 'rgb(139,69,19)', border: 'rgb(210,180,140)' },
      { bg: 'rgb(245,255,250)', text: 'rgb(46,139,87)', border: 'rgb(152,251,152)' },
      { bg: 'rgb(255,228,225)', text: 'rgb(178,34,34)', border: 'rgb(250,128,114)' },
      { bg: 'rgb(240,255,255)', text: 'rgb(0,139,139)', border: 'rgb(175,238,238)' },
      { bg: 'rgb(253,245,230)', text: 'rgb(184,134,11)', border: 'rgb(218,165,32)' },
      { bg: 'rgb(248,248,255)', text: 'rgb(75,0,130)', border: 'rgb(230,230,250)' },
      { bg: 'rgb(255,250,250)', text: 'rgb(139,0,0)', border: 'rgb(255,228,225)' },
      { bg: 'rgb(245,245,220)', text: 'rgb(85,107,47)', border: 'rgb(189,183,107)' },
    ];
  
    const numberColorCombinations = [
      { bg: 'rgb(255,245,238)', text: 'rgb(210,105,30)', border: 'rgb(255,228,196)' },
      { bg: 'rgb(240,255,240)', text: 'rgb(34,139,34)', border: 'rgb(144,238,144)' },
      { bg: 'rgb(255,250,250)', text: 'rgb(220,20,60)', border: 'rgb(255,192,203)' },
      { bg: 'rgb(245,255,250)', text: 'rgb(0,128,128)', border: 'rgb(175,238,238)' },
      { bg: 'rgb(240,248,255)', text: 'rgb(70,130,180)', border: 'rgb(173,216,230)' },
      { bg: 'rgb(255,255,240)', text: 'rgb(184,134,11)', border: 'rgb(240,230,140)' },
      { bg: 'rgb(248,248,255)', text: 'rgb(106,90,205)', border: 'rgb(230,230,250)' },
      { bg: 'rgb(255,240,245)', text: 'rgb(199,21,133)', border: 'rgb(255,182,193)' },
      { bg: 'rgb(245,245,245)', text: 'rgb(105,105,105)', border: 'rgb(220,220,220)' },
      { bg: 'rgb(255,250,240)', text: 'rgb(160,82,45)', border: 'rgb(222,184,135)' },
    ];
  
    const firstChar = word.charAt(0).toLowerCase();
    let colorCombinations, index;
  
    if (/[0-9]/.test(firstChar)) {
      // It's a number
      colorCombinations = numberColorCombinations;
      index = parseInt(firstChar, 10);
    } else {
      // It's a letter
      colorCombinations = letterColorCombinations;
      index = firstChar.charCodeAt(0) - 'a'.charCodeAt(0);
    }
  
    const colorIndex = index % colorCombinations.length;
    const { bg, text, border } = colorCombinations[colorIndex];
  
    return {
      backgroundColor: bg,
      color: text,
      border: `1px solid ${border}`
    };
  };
