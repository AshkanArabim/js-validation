// // makefield called as many times an necessary
// // you need a constructor with attrs

const utils = (function () {
    function cr(element) {
        return document.createElement(element);
    }
    function qs(query) {
        return document.querySelector(query);
    }
    function appChildren(parent) {
        for (let i = 1; i <= arguments.length - 1; i++) {
            parent.appendChild(arguments[i]);
        }
    }
    function etc(element, text) {
        const product = this.cr(element);
        product.textContent = text;
        if (arguments[2]) {
            for (let i = 2; i < arguments.length; i++) {
                product.classList.add(arguments[i]);
            }
        }
        return product;
    }

    return { cr, qs, appChildren, etc };
})();

const app = (function () {
    const body = document.querySelector("body");
    const form = utils.cr("form");
    form.action = "post";
    form.setAttribute("autocomplete", "off");
    body.appendChild(form);

    const validate = function (field) {
        if (field.value === "") {
            field.setCustomValidity("fill this field");
            field.reportValidity();
            console.log("this empty");
        } else if (!field.checkValidity()) {
            field.setCustomValidity("field is wrong");
            field.reportValidity();
            console.log("this wrong");
        } else if (field.type === "password") {
            const passwords = Array.from(
                document.querySelectorAll('form>label>input[type="password"]')
            );
            if (passwords[0].value !== passwords[1].value) {
                for (field of passwords) {
                    field.setCustomValidity("passwords don't match");
                }
            } else {
                for (field of passwords) {
                    field.setCustomValidity("");
                }
            }
        } else if (field.id === "zip") {
            const re = new RegEfieldp("[0-9]{5}");
            if (!re.test(field.value)) {
                field.setCustomValidity("This is not a zip code.");
            }
        }
    };

    const makeField = function (id, displayText, type) {
        const input = utils.cr("input");
        const label = utils.cr("label");
        const text = utils.cr("h6");

        input.setAttribute("autocomplete", "off");

        label.htmlFor = id;
        text.textContent = displayText;
        input.type = type;
        input.id = id;

        input.addEventListener("input", () => {
            input.setCustomValidity("");
            validate(input);
        });

        utils.appChildren(label, text, input);

        return label;
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        for (x of Array.from(document.querySelectorAll("form>label>input"))) {
            validate(x);
        }
    });

    utils.appChildren(
        form,
        makeField("email", "Email:", "email"),
        makeField("country", "Country:", "text"),
        makeField("zip", "Zip code:", "text"),
        makeField("password", "Password:", "password"),
        makeField("confirmpass", "Confirm Password:", "password"),
        utils.etc("button", "Submit")
    );
})();
