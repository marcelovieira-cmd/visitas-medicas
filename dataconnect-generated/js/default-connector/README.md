# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*listarUsuarios*](#listarusuarios)
  - [*buscarUsuarioPorId*](#buscarusuarioporid)
- [**Mutations**](#mutations)
  - [*usuarioInsert*](#usuarioinsert)
  - [*usuarioUpsert*](#usuarioupsert)
  - [*usuarioDelete*](#usuariodelete)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## listarUsuarios
You can execute the `listarUsuarios` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listarUsuarios(): QueryPromise<ListarUsuariosData, undefined>;

interface ListarUsuariosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarUsuariosData, undefined>;
}
export const listarUsuariosRef: ListarUsuariosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarUsuarios(dc: DataConnect): QueryPromise<ListarUsuariosData, undefined>;

interface ListarUsuariosRef {
  ...
  (dc: DataConnect): QueryRef<ListarUsuariosData, undefined>;
}
export const listarUsuariosRef: ListarUsuariosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarUsuariosRef:
```typescript
const name = listarUsuariosRef.operationName;
console.log(name);
```

### Variables
The `listarUsuarios` query has no variables.
### Return Type
Recall that executing the `listarUsuarios` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarUsuariosData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarUsuariosData {
  usuarios: ({
    usuarioId?: UUIDString | null;
    nome?: string | null;
  })[];
}
```
### Using `listarUsuarios`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarUsuarios } from '@firebasegen/default-connector';


// Call the `listarUsuarios()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarUsuarios();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarUsuarios(dataConnect);

console.log(data.usuarios);

// Or, you can use the `Promise` API.
listarUsuarios().then((response) => {
  const data = response.data;
  console.log(data.usuarios);
});
```

### Using `listarUsuarios`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarUsuariosRef } from '@firebasegen/default-connector';


// Call the `listarUsuariosRef()` function to get a reference to the query.
const ref = listarUsuariosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarUsuariosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.usuarios);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.usuarios);
});
```

## buscarUsuarioPorId
You can execute the `buscarUsuarioPorId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
buscarUsuarioPorId(vars: BuscarUsuarioPorIdVariables): QueryPromise<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;

interface BuscarUsuarioPorIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuscarUsuarioPorIdVariables): QueryRef<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;
}
export const buscarUsuarioPorIdRef: BuscarUsuarioPorIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
buscarUsuarioPorId(dc: DataConnect, vars: BuscarUsuarioPorIdVariables): QueryPromise<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;

interface BuscarUsuarioPorIdRef {
  ...
  (dc: DataConnect, vars: BuscarUsuarioPorIdVariables): QueryRef<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;
}
export const buscarUsuarioPorIdRef: BuscarUsuarioPorIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the buscarUsuarioPorIdRef:
```typescript
const name = buscarUsuarioPorIdRef.operationName;
console.log(name);
```

### Variables
The `buscarUsuarioPorId` query requires an argument of type `BuscarUsuarioPorIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BuscarUsuarioPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `buscarUsuarioPorId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BuscarUsuarioPorIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BuscarUsuarioPorIdData {
  usuario?: {
    usuarioId?: UUIDString | null;
    nome?: string | null;
  };
}
```
### Using `buscarUsuarioPorId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, buscarUsuarioPorId, BuscarUsuarioPorIdVariables } from '@firebasegen/default-connector';

// The `buscarUsuarioPorId` query requires an argument of type `BuscarUsuarioPorIdVariables`:
const buscarUsuarioPorIdVars: BuscarUsuarioPorIdVariables = {
  id: ..., 
};

// Call the `buscarUsuarioPorId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await buscarUsuarioPorId(buscarUsuarioPorIdVars);
// Variables can be defined inline as well.
const { data } = await buscarUsuarioPorId({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await buscarUsuarioPorId(dataConnect, buscarUsuarioPorIdVars);

console.log(data.usuario);

// Or, you can use the `Promise` API.
buscarUsuarioPorId(buscarUsuarioPorIdVars).then((response) => {
  const data = response.data;
  console.log(data.usuario);
});
```

### Using `buscarUsuarioPorId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, buscarUsuarioPorIdRef, BuscarUsuarioPorIdVariables } from '@firebasegen/default-connector';

// The `buscarUsuarioPorId` query requires an argument of type `BuscarUsuarioPorIdVariables`:
const buscarUsuarioPorIdVars: BuscarUsuarioPorIdVariables = {
  id: ..., 
};

// Call the `buscarUsuarioPorIdRef()` function to get a reference to the query.
const ref = buscarUsuarioPorIdRef(buscarUsuarioPorIdVars);
// Variables can be defined inline as well.
const ref = buscarUsuarioPorIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = buscarUsuarioPorIdRef(dataConnect, buscarUsuarioPorIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.usuario);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## usuarioInsert
You can execute the `usuarioInsert` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
usuarioInsert(vars: UsuarioInsertVariables): MutationPromise<UsuarioInsertData, UsuarioInsertVariables>;

interface UsuarioInsertRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UsuarioInsertVariables): MutationRef<UsuarioInsertData, UsuarioInsertVariables>;
}
export const usuarioInsertRef: UsuarioInsertRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
usuarioInsert(dc: DataConnect, vars: UsuarioInsertVariables): MutationPromise<UsuarioInsertData, UsuarioInsertVariables>;

interface UsuarioInsertRef {
  ...
  (dc: DataConnect, vars: UsuarioInsertVariables): MutationRef<UsuarioInsertData, UsuarioInsertVariables>;
}
export const usuarioInsertRef: UsuarioInsertRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the usuarioInsertRef:
```typescript
const name = usuarioInsertRef.operationName;
console.log(name);
```

### Variables
The `usuarioInsert` mutation requires an argument of type `UsuarioInsertVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UsuarioInsertVariables {
  nome: string;
}
```
### Return Type
Recall that executing the `usuarioInsert` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UsuarioInsertData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UsuarioInsertData {
  usuario_insert: Usuario_Key;
}
```
### Using `usuarioInsert`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, usuarioInsert, UsuarioInsertVariables } from '@firebasegen/default-connector';

// The `usuarioInsert` mutation requires an argument of type `UsuarioInsertVariables`:
const usuarioInsertVars: UsuarioInsertVariables = {
  nome: ..., 
};

// Call the `usuarioInsert()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await usuarioInsert(usuarioInsertVars);
// Variables can be defined inline as well.
const { data } = await usuarioInsert({ nome: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await usuarioInsert(dataConnect, usuarioInsertVars);

console.log(data.usuario_insert);

// Or, you can use the `Promise` API.
usuarioInsert(usuarioInsertVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_insert);
});
```

### Using `usuarioInsert`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, usuarioInsertRef, UsuarioInsertVariables } from '@firebasegen/default-connector';

// The `usuarioInsert` mutation requires an argument of type `UsuarioInsertVariables`:
const usuarioInsertVars: UsuarioInsertVariables = {
  nome: ..., 
};

// Call the `usuarioInsertRef()` function to get a reference to the mutation.
const ref = usuarioInsertRef(usuarioInsertVars);
// Variables can be defined inline as well.
const ref = usuarioInsertRef({ nome: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = usuarioInsertRef(dataConnect, usuarioInsertVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_insert);
});
```

## usuarioUpsert
You can execute the `usuarioUpsert` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
usuarioUpsert(vars: UsuarioUpsertVariables): MutationPromise<UsuarioUpsertData, UsuarioUpsertVariables>;

interface UsuarioUpsertRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UsuarioUpsertVariables): MutationRef<UsuarioUpsertData, UsuarioUpsertVariables>;
}
export const usuarioUpsertRef: UsuarioUpsertRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
usuarioUpsert(dc: DataConnect, vars: UsuarioUpsertVariables): MutationPromise<UsuarioUpsertData, UsuarioUpsertVariables>;

interface UsuarioUpsertRef {
  ...
  (dc: DataConnect, vars: UsuarioUpsertVariables): MutationRef<UsuarioUpsertData, UsuarioUpsertVariables>;
}
export const usuarioUpsertRef: UsuarioUpsertRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the usuarioUpsertRef:
```typescript
const name = usuarioUpsertRef.operationName;
console.log(name);
```

### Variables
The `usuarioUpsert` mutation requires an argument of type `UsuarioUpsertVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UsuarioUpsertVariables {
  usuarioId: UUIDString;
  nome: string;
}
```
### Return Type
Recall that executing the `usuarioUpsert` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UsuarioUpsertData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UsuarioUpsertData {
  usuario_upsert: Usuario_Key;
}
```
### Using `usuarioUpsert`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, usuarioUpsert, UsuarioUpsertVariables } from '@firebasegen/default-connector';

// The `usuarioUpsert` mutation requires an argument of type `UsuarioUpsertVariables`:
const usuarioUpsertVars: UsuarioUpsertVariables = {
  usuarioId: ..., 
  nome: ..., 
};

// Call the `usuarioUpsert()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await usuarioUpsert(usuarioUpsertVars);
// Variables can be defined inline as well.
const { data } = await usuarioUpsert({ usuarioId: ..., nome: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await usuarioUpsert(dataConnect, usuarioUpsertVars);

console.log(data.usuario_upsert);

// Or, you can use the `Promise` API.
usuarioUpsert(usuarioUpsertVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_upsert);
});
```

### Using `usuarioUpsert`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, usuarioUpsertRef, UsuarioUpsertVariables } from '@firebasegen/default-connector';

// The `usuarioUpsert` mutation requires an argument of type `UsuarioUpsertVariables`:
const usuarioUpsertVars: UsuarioUpsertVariables = {
  usuarioId: ..., 
  nome: ..., 
};

// Call the `usuarioUpsertRef()` function to get a reference to the mutation.
const ref = usuarioUpsertRef(usuarioUpsertVars);
// Variables can be defined inline as well.
const ref = usuarioUpsertRef({ usuarioId: ..., nome: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = usuarioUpsertRef(dataConnect, usuarioUpsertVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_upsert);
});
```

## usuarioDelete
You can execute the `usuarioDelete` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
usuarioDelete(vars: UsuarioDeleteVariables): MutationPromise<UsuarioDeleteData, UsuarioDeleteVariables>;

interface UsuarioDeleteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UsuarioDeleteVariables): MutationRef<UsuarioDeleteData, UsuarioDeleteVariables>;
}
export const usuarioDeleteRef: UsuarioDeleteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
usuarioDelete(dc: DataConnect, vars: UsuarioDeleteVariables): MutationPromise<UsuarioDeleteData, UsuarioDeleteVariables>;

interface UsuarioDeleteRef {
  ...
  (dc: DataConnect, vars: UsuarioDeleteVariables): MutationRef<UsuarioDeleteData, UsuarioDeleteVariables>;
}
export const usuarioDeleteRef: UsuarioDeleteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the usuarioDeleteRef:
```typescript
const name = usuarioDeleteRef.operationName;
console.log(name);
```

### Variables
The `usuarioDelete` mutation requires an argument of type `UsuarioDeleteVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UsuarioDeleteVariables {
  usuarioId: UUIDString;
}
```
### Return Type
Recall that executing the `usuarioDelete` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UsuarioDeleteData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UsuarioDeleteData {
  usuario_delete?: Usuario_Key | null;
}
```
### Using `usuarioDelete`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, usuarioDelete, UsuarioDeleteVariables } from '@firebasegen/default-connector';

// The `usuarioDelete` mutation requires an argument of type `UsuarioDeleteVariables`:
const usuarioDeleteVars: UsuarioDeleteVariables = {
  usuarioId: ..., 
};

// Call the `usuarioDelete()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await usuarioDelete(usuarioDeleteVars);
// Variables can be defined inline as well.
const { data } = await usuarioDelete({ usuarioId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await usuarioDelete(dataConnect, usuarioDeleteVars);

console.log(data.usuario_delete);

// Or, you can use the `Promise` API.
usuarioDelete(usuarioDeleteVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_delete);
});
```

### Using `usuarioDelete`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, usuarioDeleteRef, UsuarioDeleteVariables } from '@firebasegen/default-connector';

// The `usuarioDelete` mutation requires an argument of type `UsuarioDeleteVariables`:
const usuarioDeleteVars: UsuarioDeleteVariables = {
  usuarioId: ..., 
};

// Call the `usuarioDeleteRef()` function to get a reference to the mutation.
const ref = usuarioDeleteRef(usuarioDeleteVars);
// Variables can be defined inline as well.
const ref = usuarioDeleteRef({ usuarioId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = usuarioDeleteRef(dataConnect, usuarioDeleteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_delete);
});
```

