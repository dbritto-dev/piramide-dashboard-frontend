import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import moment from 'moment';
// API Data and Helpers
import * as api from './api/mock';
import * as data from './api/data';
import { uniqid, optionsWithIcon, optionWithIcon } from './utils/helpers';
// Components
import Navbar from './Navbar';
import Steps from './Steps';
import Order from './Order';
import StartCreateSalesOrderModal from './StartCreateSalesOrderModal';
import FinishCreateSalesOrderModal from './FinishCreateSalesOrderModal';
import OverviewSalesOrderModal from './OverviewSalesOrderModal';
import AddProductModal from './AddProductModal';
import ChangePasswordModal from './ChangePasswordModal';
import Notifications from './Notifications';
// Resources
import './App.css';
import logo from './logo.svg';

window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {
  customer: '4000000007',
  steps: [
    {
      title: 'Solicitante',
    },
    {
      title: 'Condición de entrega',
    },
    {
      title: 'Clase de pedido',
    },
    {
      title: 'Condición de Pago',
    },
    {
      title: 'Datos Generales',
    },
  ],
  distributionChannel: '10',
  requesterList: data.requesterList,
  shippingConditionList: data.shippingConditionList,
  orderTypeList: data.orderTypeList,
  paymentConditionList: data.paymentConditionList,
  reasonTransferList: data.reasonTransferList,
  advancePayments: [],
  departmentList: data.departmentList,
  provinceList: data.provinceList,
  districtList: data.districtList,
  materialList: data.materialList,
  abbreviatedWeekDays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  weekDays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  today: 'Hoy día',
  sapDateFormat: 'YYYYMMDD',
};

const App = () => {
  const customer = window.__INITIAL_STATE__.customer;
  const steps = window.__INITIAL_STATE__.steps;
  const abbreviatedWeekDays = window.__INITIAL_STATE__.abbreviatedWeekDays;
  const weekDays = window.__INITIAL_STATE__.weekDays;
  const months = window.__INITIAL_STATE__.months;
  const today = window.__INITIAL_STATE__.today;
  const distributionChannel = window.__INITIAL_STATE__.distributionChannel;
  const sapDateFormat = window.__INITIAL_STATE__.sapDateFormat;
  const [currentStep, setCurrentStep] = useState(0);
  const [requester, setRequester] = useState({
    inputValue: '',
    options: window.__INITIAL_STATE__.requesterList,
    selection: [optionWithIcon(window.__INITIAL_STATE__.requesterList[0])],
  });
  const [receiverCondition, setReceiverCondition] = useState('01');
  const [shippingCondition, setShippingCondition] = useState({
    inputValue: '',
    options: window.__INITIAL_STATE__.shippingConditionList,
    selection: [],
  });
  const [orderType, setOrderType] = useState({
    inputValue: '',
    options: window.__INITIAL_STATE__.orderTypeList,
    selection: [],
  });
  const [paymentCondition, setPaymentCondition] = useState({
    inputValue: '',
    options: window.__INITIAL_STATE__.paymentConditionList,
    selection: [],
  });
  const [reasonTransfer, setReasonTransfer] = useState({
    options: window.__INITIAL_STATE__.reasonTransferList,
    selection: [],
  });
  const [advancePayments, setAdvancePayments] = useState({
    options: window.__INITIAL_STATE__.advancePayments,
    selection: [],
  });
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryHour, setDeliveryHour] = useState(null);
  const deliveryDateValidation = ({ date = new Date() }) => {
    const current = moment(date);
    const min = moment().add(1, 'days');
    const max = moment().add(15, 'days');
    return !current.isBetween(min, max);
  };
  const [materials, setMaterials] = useState({
    inputValue: '',
    options: window.__INITIAL_STATE__.materialList,
    selection: [],
  });
  const [materialQuantity, setMaterialQuantity] = useState(1);
  const [products, setProducts] = useState({
    options: [],
    selection: [],
  });
  const [orderIsEnabled, setOrderIsEnabled] = useState(false);
  // Add Product Modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  // Vehicle
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleGrossWeight, setVehicleGrossWeight] = useState('');
  const [vehicleTare, setVehicleTare] = useState('');
  const [vehicleDriver, setVehicleDriver] = useState('');
  const [vehicleLicense, setVehicleLicense] = useState('');
  // Receiver
  const [receiverDocument, setReceiverDocument] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverStreet, setReceiverStreet] = useState('');
  const [receiverDoor, setReceiverDoor] = useState('');
  const [receiverDepartment, setReceiverDepartment] = useState({
    inputValue: '',
    options: window.__INITIAL_STATE__.departmentList,
    selection: [],
  });
  const [receiverProvince, setReceiverProvince] = useState({
    inputValue: '',
    options: [],
    selection: [],
  });
  const [receiverDistrict, setReceiverDistrict] = useState({
    inputValue: '',
    options: [],
    selection: [],
  });
  const [receiverReference, setReceiverReference] = useState('');
  // Alerts
  const [notifications, setNotifications] = useState([]);
  const closeNotification = notification => {
    setNotifications(lodash.filter(notifications, n => n.id !== notification.id));
  };
  // Steps
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  // Sales Order Modals
  const [startCreateSalesOrderModal, setStartCreateSalesOrderModal] = useState({
    title: 'Creando Pedido',
    promptType: 'info',
    description:
      'Esta operacion puede tomar unos minutos, porfavor espere ' +
      'y no cierre y/o actualize la pagina',
    open: false,
  });
  const [finishCreateOrderModal, setFinishCreateOrderModal] = useState({
    title: 'Pedido',
    promptType: 'success',
    description: '',
    open: false,
  });
  const [overviewSalesOrderModal, setOverviewSalesOrderModal] = useState({
    title: 'Resumen del Pedido',
    open: false,
  });
  // Chande Password Modal
  const [changePasswordModal, setChangePasswordModal] = useState({
    title: 'Cambiar contraseña',
    open: false,
  });
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // Helpers
  const toItems = products =>
    lodash.map(products, (product, index) => {
      const { value, quantity: qty } = product;
      const ITM_NUMBER = lodash.padStart(((index + 1) * 10).toString(), 6, '0');
      const MATERIAL = value;
      const PLANT = '1000';
      const TARGET_QTY = lodash.padStart((qty * 1000).toString(), 20, '0');
      return {
        ITM_NUMBER,
        MATERIAL,
        PLANT,
        TARGET_QTY,
      };
    });
  const getFirstNameAndLastName = (fullName, size = 40) => {
    if (fullName.length <= size) {
      return fullName.split(' ');
    } else {
      var firstName = [];
      var lastName = [];
      var splits = fullName.split(' ');
      for (var i = 0; i < splits.length; i++) {
        const firstNameSize =
          lodash.reduce([...splits, splits[i]], (acc, word) => acc + word.length, 0) +
          firstName.length;
        if (firstNameSize <= size) {
          firstName.push(splits[i]);
        } else {
          lastName.push(splits[i]);
        }
      }

      return [firstName.join(' '), lastName.join(' ').substr(0, 40)];
    }
  };
  // Simulate Sales Order
  const simulateSalesOrder = () => {
    setNotifications([]);

    if (!validateAllSteps()) {
      setNotifications(current => [
        ...current,
        {
          id: uniqid(),
          title: 'La cotización no se ha realizado satisfactoriamente',
          description: 'Para cotizar es necesario completar todos los pasos',
          type: 'first_non_empty',
        },
      ]);

      return;
    }

    if (!products.options.length) {
      setNotifications(current => [
        ...current,
        {
          id: uniqid(),
          title: 'La cotización no se ha realizado satisfactoriamente',
          description: 'No hay productos en el pedido',
          type: 'first_non_empty',
        },
      ]);

      return;
    }

    setNotifications(current => [
      ...current,
      {
        id: uniqid(),
        title: 'Realizando cotización',
        description: 'Esta operación puede tomar unos minutos',
        type: 'business_hours',
      },
    ]);

    const salesOrder = {
      I_HEADER: {
        DOC_TYPE: orderType.selection[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(deliveryDate).format(sapDateFormat),
        PURCH_NO_C: purchaseOrder,
        SOLICITANTE: requester.selection[0].value,
        DESTINATARIO: requester.selection[0].value,
        SHIP_COND: shippingCondition.selection[0].value,
        PMNTTRMS: paymentCondition.selection[0].value,
        CUST_GRP2: reasonTransfer.selection[0].value,
      },
      IT_ITEMS: toItems(products.options),
    };
    let errors = [];

    api.simulateSalesOrder(salesOrder).then(({ data }) => {
      if (!data['ET_CONDITION'].length || !data['ET_ITEM_WEIGTH'].length) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'La cotización tuvo algunos problemas.',
            description: 'Los productos del pedido no tienen precio, stock o peso.',
            type: 'first_non_empty',
          },
        ]);
        return;
      }

      lodash.each(lodash.groupBy(data['ET_CONDITION'], 'ITM_NUMBER'), (info, ITM_NUMBER) => {
        try {
          const index = +ITM_NUMBER / 10 - 1;
          const amount = +lodash.find(info, { COND_TYPE: 'ZPRB' }).CONDVALUE;
          const igv = +lodash.find(info, { COND_TYPE: 'MWST' }).CONDVALUE;
          setProducts(current => {
            const options = lodash.map(current.options, (product, key) => {
              if (index !== key) return product;
              return {
                ...product,
                amount,
                igv,
              };
            });
            return {
              ...current,
              options,
            };
          });
        } catch (e) {
          const index = +ITM_NUMBER / 10;
          errors = [
            ...errors,
            {
              id: uniqid(),
              title: `El producto Nro: ${index} no tiene stock o precio.`,
              description: 'No se pudo determinar el monto e IGV.',
              type: 'first_non_empty',
            },
          ];
        }
      });

      lodash.each(data['ET_ITEM_WEIGTH'], info => {
        try {
          const { ITM_NUMBER, BRGEW } = info;
          const index = +ITM_NUMBER / 10 - 1;
          const weight = +BRGEW;
          setProducts(current => {
            const options = lodash.map(current.options, (product, key) => {
              if (index !== key) return product;
              return {
                ...product,
                weight,
              };
            });
            return {
              ...current,
              options,
            };
          });
        } catch (e) {
          const { ITM_NUMBER } = info;
          const index = +ITM_NUMBER / 10 - 1;
          errors = [
            ...errors,
            {
              id: uniqid(),
              title: `El producto Nro: ${index} no tiene peso.`,
              description: 'No se pudo determinar el peso.',
              type: 'first_non_empty',
            },
          ];
        }
      });

      const hasErrors = !!errors.length;

      if (hasErrors) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'La cotización no se ha realizado satisfactoriamente.',
            description: 'Algunos productos no tienen stock, precio o peso.',
            type: 'first_non_empty',
          },
          ...errors,
        ]);
      } else {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'La cotización se ha realizado satisfactoriamente.',
            description: 'Ya puede proceder a crear el pedido.',
            type: 'approval',
          },
        ]);
      }

      setOrderIsEnabled(!hasErrors);
    });
  };
  // Create Sales Order
  const createSalesOrder = () => {
    if (!orderIsEnabled) return;

    setNotifications([]);

    setStartCreateSalesOrderModal(current => ({
      ...current,
      open: true,
    }));

    let salesOrder = {
      I_HEADER: {
        DOC_TYPE: orderType.selection[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(deliveryDate).format(sapDateFormat),
        PURCH_NO_C: purchaseOrder,
        SOLICITANTE: requester.selection[0].value,
        DESTINATARIO: requester.selection[0].value,
        SHIP_COND: shippingCondition.selection[0].value,
        PMNTTRMS: paymentCondition.selection[0].value,
        CUST_GRP2: reasonTransfer.selection[0].value,
      },
      IT_ITEMS: toItems(products.options),
    };

    if (paymentCondition.selection[0].value === 'C000' && !!advancePayments.selection.length) {
      salesOrder.I_ANTICIPO = advancePayments.selection[0].value;
    }

    if (shippingCondition.selection[0].value === '01') {
      if (receiverCondition === '01') {
        api.createSalesOrder(salesOrder).then(({ data: salesOrderDoc }) => {
          if (salesOrderDoc) {
            setFinishCreateOrderModal(current => ({
              ...current,
              title: `Pedido #${salesOrderDoc}`,
              promptType: 'success',
              description: 'El pedido se ha creado satisfactoriamente.',
              open: true,
            }));
          } else {
            setFinishCreateOrderModal(current => ({
              ...current,
              promptType: 'error',
              description: 'El pedido no se ha creado satisfactoriamente.',
              open: true,
            }));
          }

          setStartCreateSalesOrderModal(current => ({
            ...current,
            open: false,
          }));
        });
      } else {
        const [firstName, lastName] = getFirstNameAndLastName(receiverName);
        const receiver = {
          PI_PERSONALDATA: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            CITY: receiverProvince.selection[0].value,
            DISTRICT: receiverDistrict.selection[0].value,
            STREET: receiverStreet,
            HOUSE_NO: receiverDoor,
            COUNTRY: 'PE',
            REGION: receiverDepartment.selection[0].value,
            LANGU_P: 'ES',
            CURRENCY: 'PEN',
          },
          PI_OPT_PERSONALDATA: {
            TRANSPZONE: receiverDistrict.selection[0].TRANSPZONE,
          },
          PI_ADRS_REFERENCE: receiverReference,
          I_VTWEG: distributionChannel,
          I_KUNNR: distributionChannel === '30' ? requester.selection[0].value : '0020001841',
        };

        api.createReceiver(receiver).then(({ data: receiverDoc }) => {
          if (!receiverDoc) {
            setStartCreateSalesOrderModal(current => ({
              ...current,
              open: false,
            }));

            setFinishCreateOrderModal(current => ({
              ...current,
              promptType: 'error',
              description:
                'El pedido no se ha creado satisfactoriamente.' +
                'No se pudo crear el destinatario.',
              open: true,
            }));

            return;
          }

          salesOrder.I_HEADER.DESTINATARIO = receiverDoc;

          api.createSalesOrder(salesOrder).then(({ data: salesOrderDoc }) => {
            setStartCreateSalesOrderModal(current => ({
              ...current,
              open: false,
            }));

            if (salesOrderDoc) {
              setFinishCreateOrderModal(current => ({
                ...current,
                title: `Pedido #${salesOrderDoc}`,
                promptType: 'success',
                description: 'El pedido se ha creado satisfactoriamente.',
                open: true,
              }));
            } else {
              setFinishCreateOrderModal(current => ({
                ...current,
                promptType: 'error',
                description: 'El pedido no se ha creado satisfactoriamente.',
                open: true,
              }));
            }
          });
        });
      }
    } else {
      salesOrder.I_HEADER.DESTINATARIO = '0020001841';
      salesOrder.I_VEHICLE = {
        TNDR_TRKID: vehiclePlate,
        BRUTO: vehicleGrossWeight,
        TARA: vehicleTare,
        MEINS: 'KG',
        TNDR_CRNM: vehicleDriver,
        EXTI1: vehicleLicense,
      };
      salesOrder.I_REQ_TIME = moment(deliveryHour).format('HH:mm:ss');

      api.createSalesOrder(salesOrder).then(({ data: salesOrderDoc }) => {
        setStartCreateSalesOrderModal(current => ({
          ...current,
          open: false,
        }));

        if (salesOrderDoc) {
          setFinishCreateOrderModal(current => ({
            ...current,
            title: `Pedido #${salesOrderDoc}`,
            promptType: 'success',
            description: 'El pedido se ha creado satisfactoriamente.',
            open: true,
          }));
        } else {
          setFinishCreateOrderModal(current => ({
            ...current,
            promptType: 'error',
            description: 'El pedido no se ha creado satisfactoriamente.',
            open: true,
          }));
        }
      });
    }
  };
  // Change Password
  const changePassword = () => {
    setNotifications([]);

    if (!password.length || !verifyPassword.length || !newPassword) {
      setNotifications(current => [
        ...current,
        {
          id: uniqid(),
          title: 'No se puede realizar el cambio de contraseña',
          description: 'Es necesario completar todos los campos',
          type: 'first_non_empty',
        },
      ]);

      return;
    }

    if (newPassword !== verifyPassword) {
      setNotifications(current => [
        ...current,
        {
          id: uniqid(),
          title: 'No se puede realizar el cambio de contraseña',
          description: 'La nueva contraseña y la contraseña de verificación no coinciden',
          type: 'first_non_empty',
        },
      ]);

      return;
    }

    setChangePasswordModal(current => ({
      ...current,
      open: false,
    }));

    setNotifications(current => [
      ...current,
      {
        id: uniqid(),
        title: 'Realizando cambio de contraseña',
        description: 'Esta operación puede tomar unos minutos',
        type: 'business_hours',
      },
    ]);

    const data = {
      I_KUNNR: customer,
      PASSWORD: password,
      NEW_PASSWORD: newPassword,
      VERIFY_PASSWORD: verifyPassword,
    };

    api.changePassword(data).then(({ data: passwordChanged }) => {
      if (!passwordChanged) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El cambio de contraseña no se ha realizado ' + 'satisfactoriamente',
            description:
              'La contraseña es incorrecta o la contraseña ' +
              ' y la contraseña de verificación no coinciden',
            type: 'first_non_empty',
          },
        ]);
      } else {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El cambio de contrañse se ha realizado satisfactoriamente',
            description: 'Se cerrará la sesión. Vuelva a iniciar sesión.',
            type: 'approval',
          },
        ]);
        setTimeout(() => {
          window.location.href = '/logout';
        }, 1000);
      }
    });
  };
  // Check Steps
  const validateAllSteps = (notifications = false) => {
    setNotifications([]);

    const validateStep1 = () => {
      let valid = !!requester.selection.length;

      if (!valid && notifications) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El paso 1 no se ha completado.',
            description: 'Es necesario completar los campos.',
            type: 'return_order',
          },
        ]);
      }

      return valid;
    };
    const validateStep2 = () => {
      if (!shippingCondition.selection.length) {
        if (notifications) {
          setNotifications(current => [
            ...current,
            {
              id: uniqid(),
              title: 'El paso 2 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ]);
        }

        return false;
      }

      let valid = true;

      switch (shippingCondition.selection[0].value) {
        case '01':
          switch (receiverCondition) {
            case '01':
              valid = !!requester.selection.length;
              break;
            case '02':
              valid =
                !!receiverDocument.length &&
                !!receiverName.length &&
                !!receiverStreet.length &&
                !!receiverDoor.length &&
                !!receiverDepartment.selection.length &&
                !!receiverProvince.selection.length &&
                !!receiverDistrict.selection.length;
              break;
            default:
              valid = true;
              break;
          }
          break;
        case '02':
          valid = !!vehiclePlate.length && !!vehicleDriver.length && !!vehicleLicense.length;
          break;
        default:
          valid = true;
          break;
      }

      if (!valid && notifications) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El paso 2 no se ha completado.',
            description: 'Es necesario completar los campos.',
            type: 'return_order',
          },
        ]);
      }

      return valid;
    };
    const validateStep3 = () => {
      const valid = !!orderType.selection.length;

      if (!valid && notifications) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El paso 3 no se ha completado.',
            description: 'Es necesario completar los campos.',
            type: 'return_order',
          },
        ]);
      }

      return valid;
    };
    const validateStep4 = () => {
      if (!paymentCondition.selection.length) {
        if (notifications) {
          setNotifications(current => [
            ...current,
            {
              id: uniqid(),
              title: 'El paso 4 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ]);
        }

        return false;
      }

      let valid = true;

      switch (paymentCondition.selection[0].length) {
        case 'C000':
          valid = true;
          break;
        default:
          valid = true;
          break;
      }

      if (!valid && notifications) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El paso 4 no se ha completado.',
            description: 'Es necesario completar los campos.',
            type: 'return_order',
          },
        ]);
      }

      return valid;
    };
    const validateStep5 = () => {
      const valid =
        !!purchaseOrder.length &&
        !!deliveryDate &&
        (shippingCondition.selection[0] === '02' ? !!deliveryHour : true);

      if (!valid && notifications) {
        setNotifications(current => [
          ...current,
          {
            id: uniqid(),
            title: 'El paso 5 no se ha completado.',
            description: 'Es necesario completar los campos.',
            type: 'return_order',
          },
        ]);
      }

      return valid;
    };

    const step1IsValid = validateStep1();
    const step2IsValid = validateStep2();
    const step3IsValid = validateStep3();
    const step4IsValid = validateStep4();
    const step5IsValid = validateStep5();
    const isValid = step1IsValid && step2IsValid && step3IsValid && step4IsValid && step5IsValid;

    if (isValid && notifications) {
      setNotifications(current => [
        ...current,
        {
          id: uniqid(),
          title: 'Todo esta completo.',
          description: 'Ya puede agregar productos a su pedido.',
          type: 'reward',
        },
      ]);
    }

    return isValid;
  };
  // Others
  const handleMenuUser = option => {
    switch (option.value) {
      case '01':
        setChangePasswordModal(current => ({
          ...current,
          open: true,
        }));
        break;
      case '00':
        window.location.href = '/logout';
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Set reasonTransfer by shippingCondition and receiverCondition
    if (!shippingCondition.selection.length) return;

    switch (shippingCondition.selection[0].value) {
      case '01':
        switch (receiverCondition) {
          case '02':
            setReasonTransfer(current => ({
              ...current,
              selection: lodash.filter(reasonTransfer.options, reason => reason.value === 'M'),
            }));
            break;
          case '01':
          default:
            setReasonTransfer(current => ({
              ...current,
              selection: lodash.filter(reasonTransfer.options, reason => reason.value === 'B'),
            }));
            break;
        }
        break;
      case '02':
      default:
        setReasonTransfer(current => ({
          ...current,
          selection: lodash.filter(reasonTransfer.options, reason => reason.value === 'A'),
        }));
        break;
    }
  }, [
    (!!shippingCondition.selection.length || '') && shippingCondition.selection[0].id,
    receiverCondition,
  ]);

  useEffect(() => {
    // Set receiverProvince by receiverDepartment
    if (!receiverDepartment.selection.length) return;

    const REGION = receiverDepartment.selection[0].REGIO;
    const inputValue = '';
    const options = optionsWithIcon(
      lodash.filter(window.__INITIAL_STATE__.provinceList, province => province.REGION === REGION)
    );
    const selection = [];

    setReceiverProvince({ inputValue, options, selection });
  }, [(!!receiverDepartment.selection.length || '') && receiverDepartment.selection[0].id]);

  useEffect(() => {
    // Set receiverDistrict by receiverProvince
    if (!receiverProvince.selection.length) return;

    const CITY_CODE = receiverProvince.selection[0].CITY_CODE;
    const inputValue = '';
    const options = optionsWithIcon(
      lodash.filter(
        window.__INITIAL_STATE__.districtList,
        district => district.CITY_CODE === CITY_CODE
      )
    );
    const selection = [];

    setReceiverDistrict({ inputValue, options, selection });
  }, [(receiverProvince.selection.length || '') && receiverProvince.selection[0].id]);

  useEffect(() => {
    if (!!notifications.length) {
      setTimeout(() => setNotifications(([_, ...rest]) => rest), 1e3 * 5);
    }
  }, [notifications.length]);

  return (
    <div className="slds-grid" style={{ height: '100vh' }}>
      <div className="slds-col">
        <Navbar logo={<img src={logo} alt="Piramide Logo" />} handleMenuUser={handleMenuUser} />
        <div className="slds-m-around_small">
          {/* Order Info */}
          <Steps
            steps={steps}
            currentStep={currentStep}
            requester={requester}
            setRequester={setRequester}
            shippingCondition={shippingCondition}
            setShippingCondition={setShippingCondition}
            receiverCondition={receiverCondition}
            setReceiverCondition={setReceiverCondition}
            receiverDocument={receiverDocument}
            setReceiverDocument={setReceiverDocument}
            receiverName={receiverName}
            setReceiverName={setReceiverName}
            receiverStreet={receiverStreet}
            setReceiverStreet={setReceiverStreet}
            receiverDoor={receiverDoor}
            setReceiverDoor={setReceiverDoor}
            receiverDepartment={receiverDepartment}
            setReceiverDepartment={setReceiverDepartment}
            receiverProvince={receiverProvince}
            setReceiverProvince={setReceiverProvince}
            receiverDistrict={receiverDistrict}
            setReceiverDistrict={setReceiverDistrict}
            receiverReference={receiverReference}
            setReceiverReference={setReceiverReference}
            vehiclePlate={vehiclePlate}
            setVehiclePlate={setVehiclePlate}
            vehicleGrossWeight={vehicleGrossWeight}
            setVehicleGrossWeight={setVehicleGrossWeight}
            vehicleTare={vehicleTare}
            setVehicleTare={setVehicleTare}
            vehicleDriver={vehicleDriver}
            setVehicleDriver={setVehicleDriver}
            vehicleLicense={vehicleLicense}
            setVehicleLicense={setVehicleLicense}
            orderType={orderType}
            setOrderType={setOrderType}
            paymentCondition={paymentCondition}
            setPaymentCondition={setPaymentCondition}
            advancePayments={advancePayments}
            setAdvancePayments={setAdvancePayments}
            purchaseOrder={purchaseOrder}
            setPurchaseOrder={setPurchaseOrder}
            deliveryDate={deliveryDate}
            deliveryDateValidation={deliveryDateValidation}
            setDeliveryDate={setDeliveryDate}
            deliveryHour={deliveryHour}
            setDeliveryHour={setDeliveryHour}
            prevStep={prevStep}
            nextStep={nextStep}
            validateAllSteps={validateAllSteps}
            abbreviatedWeekDays={abbreviatedWeekDays}
            weekDays={weekDays}
            months={months}
            today={today}
          />
          {/* Order */}
          <Order
            products={products}
            setProducts={setProducts}
            simulateSalesOrder={simulateSalesOrder}
            createSalesOrder={createSalesOrder}
            setShowAddProductModal={setShowAddProductModal}
            overviewSalesOrderModal={overviewSalesOrderModal}
            setOverviewSalesOrderModal={setOverviewSalesOrderModal}
            orderIsEnabled={orderIsEnabled}
            setOrderIsEnabled={setOrderIsEnabled}
          />
        </div>
      </div>
      {/* Notifications */}
      <Notifications notifications={notifications} closeNotification={closeNotification} />
      {/* Modals */}
      <AddProductModal
        materials={materials}
        setMaterials={setMaterials}
        materialQuantity={materialQuantity}
        setMaterialQuantity={setMaterialQuantity}
        products={products}
        setProducts={setProducts}
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
        setOrderIsEnabled={setOrderIsEnabled}
      />
      <StartCreateSalesOrderModal startCreateSalesOrderModal={startCreateSalesOrderModal} />
      <FinishCreateSalesOrderModal
        finishCreateOrderModal={finishCreateOrderModal}
        setFinishCreateOrderModal={setFinishCreateOrderModal}
        products={products}
        purchaseOrder={purchaseOrder}
        orderType={orderType}
        requester={requester}
        receiverCondition={receiverCondition}
        receiverStreet={receiverStreet}
        receiverDistrict={receiverDistrict}
        receiverProvince={receiverProvince}
        paymentCondition={paymentCondition}
        shippingCondition={shippingCondition}
        reasonTransfer={reasonTransfer}
        deliveryDate={deliveryDate}
        deliveryHour={deliveryHour}
        advancePayments={advancePayments}
      />
      <OverviewSalesOrderModal
        overviewSalesOrderModal={overviewSalesOrderModal}
        setOverviewSalesOrderModal={setOverviewSalesOrderModal}
        products={products}
        purchaseOrder={purchaseOrder}
        orderType={orderType}
        requester={requester}
        receiverCondition={receiverCondition}
        receiverStreet={receiverStreet}
        receiverDistrict={receiverDistrict}
        receiverProvince={receiverProvince}
        paymentCondition={paymentCondition}
        shippingCondition={shippingCondition}
        reasonTransfer={reasonTransfer}
        deliveryDate={deliveryDate}
        deliveryHour={deliveryHour}
        advancePayments={advancePayments}
      />
      <ChangePasswordModal
        changePasswordModal={changePasswordModal}
        setChangePasswordModal={setChangePasswordModal}
        password={password}
        setPassword={setPassword}
        verifyPassword={verifyPassword}
        setVerifyPassword={setVerifyPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        changePassword={changePassword}
      />
    </div>
  );
};

export default App;