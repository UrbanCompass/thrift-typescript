namespace java com.test.user
namespace js com.test.user

include "shared.thrift"
include "common/common.thrift"
include "calculator.thrift"

typedef common.CommonStruct CommonStruct

typedef calculator.Test TestStruct

enum UserState {
  LOGGED_IN = 1,
  LOGGED_OUT = 2,
}

const User USER = {
  "name": "Josh Stern",
  "userSharedStruct": {
    "sharedflag": true,
    "sharedstring": "yada yada",
  },
  "state": UserState.LOGGED_IN,
  "flag": true,
  "common": {
    "code": {
      "status": 12
    },
    "value": "test value"
  },
  "subuser": {
    "subname": "hello subuser",
    "subsubuser": {
      "subname": "hello subsubuser"
    }
  },
  "test": {
    "common": {
      "code": {
        "status": 12
      },
      "value": "test value"
    }
  }
}


const SubUser SUB_USER = {
  "subname": "hello",
  "subsubuser": {
    "subname": "there"
  }
}

struct SubUser {
  1: string subname
  2: optional SubUser subsubuser
}

struct User {
  1: string name
  2: shared.SharedSimpleStruct userSharedStruct
  3: UserState state
  4: bool flag
  5: optional i64 opt
  6: optional CommonStruct common
  7: SubUser subuser
  8: TestStruct test
}

service UserService {
    User getUser(1: i64 id)
    list<User> getUsers(1: list<i64> ids)
}
