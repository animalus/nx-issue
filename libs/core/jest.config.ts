/* eslint-disable */
export default {
    name: "core",
    preset: "../../jest.config.js",
    setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
    globals: {},
    coverageDirectory: "../../coverage/libs/core",
    snapshotSerializers: [
        "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
        "jest-preset-angular/build/AngularSnapshotSerializer.js",
        "jest-preset-angular/build/HTMLCommentSerializer.js",
    ],
};
