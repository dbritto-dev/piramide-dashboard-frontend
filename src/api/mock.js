export const factoryDate = (
  input = {
    I_FECHA_ENTREGA: '20181218',
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      data: input['I_FECHA_ENTREGA'],
      success: true,
    };
    setTimeout(() => resolve(output), 300);

    console.log('factoryDate[mock]: ', input, output);
  });
};

export const simulateSalesOrder = (
  input = {
    I_HEADER: {
      DOC_TYPE: 'ZPNE',
      SALES_ORG: '1000',
      DISTR_CHAN: '10',
      DIVISION: '10',
      REQ_DATE_H: '20181218',
      PURCH_NO_C: '1234567890',
      SOLICITANTE: '4000000007',
      DESTINATARIO: '4000000007',
    },
    IT_ITEMS: [
      {
        ITM_NUMBER: '000010',
        MATERIAL: '0400000229',
        PLANT: '1000',
        TARGET_QTY: '00000000000000200000',
      },
    ],
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      data: {
        ET_CONDITION: [
          {
            ITM_NUMBER: '000010',
            COND_ST_NO: '010',
            COND_COUNT: '01',
            COND_TYPE: 'ZPRB',
            COND_VALUE: 1,
            CURRENCY: 'PEN  ',
            COND_UNIT: 'ZUB',
            COND_P_UNT: 1,
            CURR_ISO: 'PEN',
            CD_UNT_ISO: 'EA ',
            REFOBJTYPE: '',
            REFOBJKEY: '',
            REFLOGSYS: '',
            APPLICATIO: 'V ',
            CONPRICDAT: '20190205',
            CALCTYPCON: 'C',
            CONBASEVAL: 200,
            CONEXCHRAT: 1,
            NUMCONVERT: 1,
            DENOMINATO: 1,
            CONDTYPE: '',
            STAT_CON: '',
            SCALETYPE: '',
            ACCRUALS: '',
            CONINVOLST: '',
            CONDORIGIN: 'A',
            GROUPCOND: '',
            COND_UPDAT: '',
            ACCESS_SEQ: '20',
            CONDCOUNT: '01',
            ROUNDOFFDI: 0,
            CONDVALUE: 200,
            CURRENCY_2: 'PEN  ',
            CURR_ISO_2: 'PEN',
            CONDCNTRL: 'A',
            CONDISACTI: '',
            CONDCLASS: 'B',
            FACTBASVAL: 0,
            SCALEBASIN: '',
            SCALBASVAL: 0,
            UNITMEASUR: '',
            ISO_UNIT: '',
            CURRENCKEY: '',
            CURRENISO: '',
            CONDINCOMP: '',
            CONDCONFIG: '',
            CONDCHAMAN: '',
            COND_NO: '0000007576',
            TAX_CODE: '',
            VARCOND: '',
            ACCOUNTKEY: '',
            ACCOUNT_KE: '',
            WT_WITHCD: '',
            STRUCTCOND: '',
            FACTCONBAS: 0,
            CONDCOINHD: '00',
          },
          {
            ITM_NUMBER: '000010',
            COND_ST_NO: '300',
            COND_COUNT: '01',
            COND_TYPE: 'MWST',
            COND_VALUE: 18,
            CURRENCY: '',
            COND_UNIT: '',
            COND_P_UNT: 0,
            CURR_ISO: '',
            CD_UNT_ISO: '',
            REFOBJTYPE: '',
            REFOBJKEY: '',
            REFLOGSYS: '',
            APPLICATIO: 'V ',
            CONPRICDAT: '20190205',
            CALCTYPCON: 'A',
            CONBASEVAL: 200,
            CONEXCHRAT: 0,
            NUMCONVERT: 0,
            DENOMINATO: 0,
            CONDTYPE: 'D',
            STAT_CON: '',
            SCALETYPE: '',
            ACCRUALS: '',
            CONINVOLST: '',
            CONDORIGIN: 'A',
            GROUPCOND: 'X',
            COND_UPDAT: '',
            ACCESS_SEQ: '10',
            CONDCOUNT: '01',
            ROUNDOFFDI: 0,
            CONDVALUE: 36,
            CURRENCY_2: 'PEN  ',
            CURR_ISO_2: 'PEN',
            CONDCNTRL: 'A',
            CONDISACTI: '',
            CONDCLASS: 'D',
            FACTBASVAL: 0,
            SCALEBASIN: '',
            SCALBASVAL: 0,
            UNITMEASUR: '',
            ISO_UNIT: '',
            CURRENCKEY: '',
            CURRENISO: '',
            CONDINCOMP: '',
            CONDCONFIG: '',
            CONDCHAMAN: '',
            COND_NO: '0000006879',
            TAX_CODE: 'D1',
            VARCOND: '',
            ACCOUNTKEY: '',
            ACCOUNT_KE: '',
            WT_WITHCD: '',
            STRUCTCOND: '',
            FACTCONBAS: 0,
            CONDCOINHD: '00',
          },
          {
            ITM_NUMBER: '000010',
            COND_ST_NO: '940',
            COND_COUNT: '01',
            COND_TYPE: 'VPRS',
            COND_VALUE: 1,
            CURRENCY: 'PEN  ',
            COND_UNIT: 'ZUB',
            COND_P_UNT: 1,
            CURR_ISO: 'PEN',
            CD_UNT_ISO: 'EA ',
            REFOBJTYPE: '',
            REFOBJKEY: '',
            REFLOGSYS: '',
            APPLICATIO: 'V ',
            CONPRICDAT: '20190205',
            CALCTYPCON: 'C',
            CONBASEVAL: 200,
            CONEXCHRAT: 1,
            NUMCONVERT: 1,
            DENOMINATO: 1,
            CONDTYPE: 'G',
            STAT_CON: 'X',
            SCALETYPE: '',
            ACCRUALS: '',
            CONINVOLST: '',
            CONDORIGIN: 'A',
            GROUPCOND: '',
            COND_UPDAT: '',
            ACCESS_SEQ: '00',
            CONDCOUNT: '00',
            ROUNDOFFDI: 0,
            CONDVALUE: 200,
            CURRENCY_2: 'PEN  ',
            CURR_ISO_2: 'PEN',
            CONDCNTRL: 'A',
            CONDISACTI: '',
            CONDCLASS: 'B',
            FACTBASVAL: 0,
            SCALEBASIN: '',
            SCALBASVAL: 0,
            UNITMEASUR: '',
            ISO_UNIT: '',
            CURRENCKEY: '',
            CURRENISO: '',
            CONDINCOMP: '',
            CONDCONFIG: '',
            CONDCHAMAN: '',
            COND_NO: '',
            TAX_CODE: '',
            VARCOND: '',
            ACCOUNTKEY: '',
            ACCOUNT_KE: '',
            WT_WITHCD: '',
            STRUCTCOND: '',
            FACTCONBAS: 0,
            CONDCOINHD: '00',
          },
        ],
        ET_ITEM: [
          {
            ITM_NUMBER: '000010',
            PO_ITM_NO: '',
            MATERIAL: '000000000400000229',
            MAT_ENTRD: '000000000400000229',
            SHORT_TEXT: 'HUECO 08 P1                             ',
            NET_VALUE: '000000000020000',
            CURRENCY: 'PEN  ',
            SUBTOTAL_1: '000000000040000',
            SUBTOTAL_2: '000000000000000',
            SUBTOTAL_3: '000000000000000',
            SUBTOTAL_4: '000000000000000',
            SUBTOTAL_5: '000000000000000',
            SUBTOTAL_6: '000000000000000',
            SALES_UNIT: 'ZUB',
            QTY_REQ_DT: '0000000200000',
            DLV_DATE: '20190205',
            REPL_TIME: '000',
            CONFIGURED: '',
            PURCH_NO_C: '',
            PURCH_DATE: '00000000',
            PO_METHOD: '',
            REF_1: '',
            PURCH_NO_S: '',
            PO_DAT_S: '00000000',
            PO_METH_S: '',
            REF_1_S: '',
            PO_ITM_NO_S: '',
            NET_VALUE1: 200,
            CURR_ISO: 'PEN',
            S_UNIT_ISO: 'EA ',
            REQ_QTY: 200,
            PLANT: '1000',
            TX_DOC_CUR: 36,
            MAT_EXT: '',
            MAT_GUID: '',
            MAT_VERS: '',
            MAT_E_EXT: '',
            MAT_E_GUID: '',
            MAT_E_VERS: '',
            TARGET_QTY: 0,
            TARGET_QU: 'ZUB',
            T_UNIT_ISO: 'EA ',
            ITEM_CATEG: 'ZPPV',
            SHIP_POINT: '1000',
            HG_LV_ITEM: '000000',
            CUST_MAT: '',
            PART_DLV: '',
            REASON_REJ: '',
            BILL_BLOCK: '',
            STGE_LOC: '',
            PROD_HIER: '',
            MATL_GROUP: 'PP03     ',
            SUBTOTAL1: 400,
            SUBTOTAL2: 0,
            SUBTOTAL3: 0,
            SUBTOTAL4: 0,
            SUBTOTAL5: 0,
            SUBTOTAL6: 0,
          },
        ],
        ET_ITEM_WEIGTH: [
          {
            ITM_NUMBER: '000010',
            MATERIAL: '000000000400000229',
            BRGEW: 920,
            GEWEI: 'KG ',
          },
        ],
      },
      success: true,
    };
    setTimeout(() => resolve(output), Math.floor(Math.random() * 250 + 750));

    console.log('simulateSalesOrder[mock]:', input, output);
  });
};

export const createSalesOrder = (
  input = {
    I_HEADER: {
      DOC_TYPE: 'ZPNE',
      SALES_ORG: '1000',
      DISTR_CHAN: '10',
      DIVISION: '10',
      REQ_DATE_H: '20181218',
      PURCH_NO_C: '1234567890',
      SOLICITANTE: '4000000007',
      DESTINATARIO: '4000000007',
    },
    IT_ITEMS: [
      {
        ITM_NUMBER: '000010',
        MATERIAL: '0400000229',
        PLANT: '1000',
        TARGET_QTY: '00000000000000200000',
      },
    ],
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      data: '197001051',
      success: true,
    };
    setTimeout(() => resolve(output), Math.floor(Math.random() * 750 + 750));

    console.log('createSalesOrder[mock]:', input, output);
  });
};

export const createReceiver = (
  input = {
    I_HEADER: {
      DOC_TYPE: 'ZPNE',
      SALES_ORG: '1000',
      DISTR_CHAN: '10',
      DIVISION: '10',
      REQ_DATE_H: '20181218',
      PURCH_NO_C: '1234567890',
      SOLICITANTE: '4000000007',
      DESTINATARIO: '4000000007',
    },
    IT_ITEMS: [
      {
        ITM_NUMBER: '000010',
        MATERIAL: '0400000229',
        PLANT: '1000',
        TARGET_QTY: '00000000000000200000',
      },
    ],
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      data: '197001051',
      success: true,
    };
    setTimeout(() => resolve(output), Math.floor(Math.random() * 200 + 300));

    console.log('createReceiver[mock]:', input, output);
  });
};

export const changePassword = (
  input = {
    I_KUNNR: '4000000007',
    PASSWORD: '123456',
    NEW_PASSWORD: '654321',
    VERIFY_PASSWORD: '654321',
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      data: true,
      success: true,
    };
    setTimeout(() => resolve(output), Math.floor(Math.random() * 200 + 300));

    console.log('changePassword[mock]:', input, output);
  });
};
