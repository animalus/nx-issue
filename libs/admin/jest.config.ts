/* eslint-disable */
export default {
    name: "admin",
    preset: "../../jest.config.js",
    setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
    globals: {},
    coverageDirectory: "../../coverage/libs/admin",
    snapshotSerializers: [
        "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
        "jest-preset-angular/build/AngularSnapshotSerializer.js",
        "jest-preset-angular/build/HTMLCommentSerializer.js",
    ],
};
