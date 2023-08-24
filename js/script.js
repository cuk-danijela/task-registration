document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:3000/registrationLabels");
        const labelsData = await response.json();

        console.log("Dohvaćene etikete:", labelsData);

        document.querySelector(".registration-title").textContent = labelsData.RegistrationTitle;
        document.querySelector(".registration-introduction").textContent = labelsData.RegistrationIntroductionText;
        document.querySelector(".salutation").textContent = labelsData.Salutation.FieldLabel;

        const salutationIsRequiredError = labelsData.Salutation.IsRequiredError;
        const salutationOptions = labelsData.SalutationSource;
        const salutationOptionsContainer = document.querySelector(".salutation-options");

        salutationOptions.forEach((option) => {

            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "salutation";
            radioInput.value = option.ID;
            radioInput.required = salutationIsRequiredError;

            const radioLabel = document.createElement("label");
            radioLabel.classList.add("salutation-label");
            radioLabel.textContent = option.Name;

            radioLabel.appendChild(radioInput);
            salutationOptionsContainer.appendChild(radioLabel);
        });



        const passwordRules = labelsData.Password;
        const passwordRulesContainer = document.querySelector(".password-rules");
        const passwordRulesList = document.createElement("ul");
        passwordRulesList.classList.add("custom-list");

        if (passwordRules.MinLengthError) {
            const minLengthRuleItem = document.createElement("li");
            minLengthRuleItem.textContent = passwordRules.MinLengthError;
            passwordRulesList.appendChild(minLengthRuleItem);
        }

        if (passwordRules.LetterRule) {
            const letterRuleItem = document.createElement("li");
            letterRuleItem.textContent = passwordRules.LetterRule;
            passwordRulesList.appendChild(letterRuleItem);
        }

        if (passwordRules.NumberRule) {
            const numberRuleItem = document.createElement("li");
            numberRuleItem.textContent = passwordRules.NumberRule;
            passwordRulesList.appendChild(numberRuleItem);
        }

        if (passwordRules.SpecialCharacterRule) {
            const specialCharRuleItem = document.createElement("li");
            specialCharRuleItem.textContent = passwordRules.SpecialCharacterRule;
            passwordRulesList.appendChild(specialCharRuleItem);
        }

        passwordRulesContainer.appendChild(passwordRulesList);


        document.querySelector(".registration-newsletter").textContent = labelsData.Newsletter.FieldLabel;

        const termsAndConditionsFieldLabel = labelsData.TermsAndConditions.FieldLabel;
        const termsAndConditionsLinkHref = labelsData.TermsAndConditionsLink.href;
        const termsAndConditionsLinkText = labelsData.TermsAndConditionsLink.text;


        document.querySelector(".registration-terms").innerHTML = termsAndConditionsFieldLabel
            .replace('${link}', `<a href="${termsAndConditionsLinkHref}">${termsAndConditionsLinkText}</a>`);

        const privacyPolicyFieldLabel = labelsData.PrivacyPolicy.FieldLabel;
        const privacyPolicyLinkHref = labelsData.PrivacyPolicyLink.href;
        const privacyPolicyLinkText = labelsData.PrivacyPolicyLink.text;

        const combinedSentence = `${termsAndConditionsFieldLabel.replace('${link}', `${termsAndConditionsLinkText}`)} und die <a href="${privacyPolicyLinkHref}">${privacyPolicyLinkText}</a>.`;

        document.querySelector(".registration-privacy").innerHTML = combinedSentence;

        document.querySelector(".registration-btn").textContent = labelsData.RegistrationSaveButtonLabel;
        document.querySelector(".registration-link").textContent = labelsData.RegistrationLoginLinkLabel;

    } catch (error) {
        console.error("Greška pri dohvatanju etiketa:", error);
    }
});
