export class DeviceType {
    id;
    title;
    url;
    image;
}

export class DeviceSubType {
    id;
    typeId;
    title;
    url;
    image;
}

export class Device {
    id;
    subTypeId;
    url;
    title;
}