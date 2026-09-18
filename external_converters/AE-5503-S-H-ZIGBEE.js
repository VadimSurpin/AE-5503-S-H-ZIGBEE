const tuya = require('zigbee-herdsman-converters/lib/tuya');
const exposes = require('zigbee-herdsman-converters/lib/exposes');

const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: tuya.fingerprint('TS0601', ['_TZE204_eaasry7v']),
    model: 'AE-5503-S-H-ZIGBEE',
    vendor: 'Tuya',
    description: 'Sauna thermostat',
    extend: [tuya.modernExtend.tuyaBase({dp: true, timeStart: '1970'})],
    exposes: [
        e.climate()
            .withSystemMode(['off', 'heat'], ea.STATE_SET)
            .withSetpoint('current_heating_setpoint', 0, 120, 1, ea.STATE_SET)
            .withLocalTemperature(ea.STATE),
        e.child_lock(),
    ],
    meta: {
        tuyaDatapoints: [
            [1, 'system_mode', tuya.valueConverterBasic.lookup({heat: true, off: false})],
            [16, 'current_heating_setpoint', tuya.valueConverter.raw],
            [24, 'local_temperature', tuya.valueConverter.raw],
            [40, 'child_lock', tuya.valueConverter.lockUnlock],
        ],
    },
};

module.exports = [definition];
