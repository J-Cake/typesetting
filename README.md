 
# TypeSetting

Very simple typesetting service

## Building

Simple:
1. Clone [the source repo](https://github.com/J-Cake/typesetting.git) and [the scriptlet repo](https://github.com/J-Cake/scriptlet.git)
    > **Note** please ensure these repositories are **siblings**
    > ```
    > ~/TypeSetting
    >   - typesetting.git
    >   - scriptlet.git
    > ```
2. Build `scriptlet` **then** the source repo using the commands below. 
    1. ```$ pnpm install```
    2. ```$ pnpm exec mkjson build/\*```
