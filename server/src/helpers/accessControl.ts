import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

// AD-HOC
// commitment application
ac.grant("ad-hoc").createOwn("commitmentApplication");
ac.grant("ad-hoc").readOwn("commitmentApplication");

// event
ac.grant("ad-hoc").readOwn("signedUpEvent");

// signup
ac.grant("ad-hoc").createOwn("signup");
ac.grant("ad-hoc").readOwn("signup");
ac.grant("ad-hoc").deleteOwn("signup");

// user
ac.grant("ad-hoc").updateOwn("user");

// volunteer
ac.grant("ad-hoc").createOwn("volunteer");
ac.grant("ad-hoc").readOwn("volunteer");
ac.grant("ad-hoc").updateOwn("volunteer");

// COMMITTED
// commitment application
ac.grant("committed").readOwn("commitmentApplication");

// event
ac.grant("committed").readOwn("signedUpEvent");

// signup
ac.grant("committed").createOwn("signup");
ac.grant("committed").readOwn("signup");
ac.grant("committed").deleteOwn("signup");

// user
ac.grant("committed").updateOwn("user");

// volunteer
ac.grant("committed").createOwn("volunteer");
ac.grant("committed").readOwn("volunteer");
ac.grant("committed").updateOwn("volunteer");

// ADMIN
// commitment application
ac.grant("admin").updateAny("commitmentApplication");
ac.grant("admin").readAny("commitmentApplication");

// event
ac.grant("admin").createAny("event");
ac.grant("admin").updateAny("event");
ac.grant("admin").deleteAny("event");
ac.grant("admin").readAny("signedUpEvent");

// form
ac.grant("admin").createAny("form");

// signup
ac.grant("admin").readAny("signup");
ac.grant("admin").updateAny("signup");
ac.grant("admin").deleteAny("signup");

// user
ac.grant("admin").updateAny("user");

// volunteer
ac.grant("admin").readAny("volunteer");
ac.grant("admin").updateAny("volunteer");
ac.grant("admin").deleteAny("volunteer");

export default ac;
