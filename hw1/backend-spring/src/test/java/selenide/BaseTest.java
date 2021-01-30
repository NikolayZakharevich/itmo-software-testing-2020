package selenide;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Condition.cssClass;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.clearBrowserCookies;
import static com.codeborne.selenide.Selenide.clearBrowserLocalStorage;
import static com.codeborne.selenide.Selenide.open;
import static com.codeborne.selenide.Selenide.refresh;
import static com.codeborne.selenide.WebDriverRunner.hasWebDriverStarted;

abstract class BaseTest {
    private final static String CSS_CLASS_BUTTON_DISABLED = "buttonDisabled";

    private final static String SELECTOR_TOP_PANEL = "#root > div > div.topPanel";
    private final static String SELECTOR_FLOOR_SWITCHER = "#root > div > div.officeMap > div.omTopPanel > div.floorSwitcher";
    private final static String SELECTOR_FLOOR_TITLE = "#root > div > div.officeMap > div.omTopPanel > div.floorTitle";

    private final String url;

    protected BaseTest(String url) {
        this.url = url;
    }

    @BeforeEach
    public void setUp() {
        Configuration.fastSetValue = false;
        if (hasWebDriverStarted()) {
            clearBrowserCookies();
            clearBrowserLocalStorage();
            refresh();
        } else {
            open(url);
        }
    }

    @Test
    public void canSelectFilter() {
        openFiltersBlock();
        for (int i = 0; i < 100; i++) {
            changeFilter(i % 5 + 1);
        }
    }

    @Test
    public void canChangeFloors() {
        String titleFloor1 = "Floor1";
        String titleFloor3 = "Floor3";

        for (int i = 0; i < 10; i++) {
            checkFloorTitle(titleFloor1);
            checkButtonEnabled(getFloorSwitcherUpButton());
            checkButtonDisabled(getFloorSwitcherDownButton());

            switchFloorUp();

            checkFloorTitle(titleFloor3);
            checkButtonDisabled(getFloorSwitcherUpButton());
            checkButtonEnabled(getFloorSwitcherDownButton());

            switchFloorDown();
        }

    }

    private void openFiltersBlock() {
        $("#root > div > div.topPanel > div.leftBlock > div").click();
    }


    private void checkFloorTitle(String expectedTitle) {
        $(SELECTOR_FLOOR_TITLE + " > span").shouldHave(text(expectedTitle));
    }

    private void checkButtonDisabled(SelenideElement button) {
        button.shouldHave(cssClass(CSS_CLASS_BUTTON_DISABLED));
    }

    private void checkButtonEnabled(SelenideElement button) {
        button.shouldNotHave(cssClass(CSS_CLASS_BUTTON_DISABLED));
    }

    private SelenideElement getFloorSwitcherUpButton() {
        return $(SELECTOR_FLOOR_SWITCHER + " > div.toUp.switcherBtn");
    }

    private SelenideElement getFloorSwitcherDownButton() {
        return $(SELECTOR_FLOOR_SWITCHER + " > div.toDown.switcherBtn");
    }

    /**
     * @param filterPos — 1..5
     */
    private void changeFilter(int filterPos) {
        String filterSelector = SELECTOR_TOP_PANEL +
                " > div.leftBlock.filterShown.bordered > div.filtersBlock > label:nth-child(" + filterPos + ")";
        $(filterSelector).click();
    }

    private void switchFloorUp() {
        getFloorSwitcherUpButton().click();
    }

    private void switchFloorDown() {
        getFloorSwitcherDownButton().click();
    }
}
