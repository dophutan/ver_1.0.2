const resultContent = document.getElementById('result-content');
const resultCard = document.getElementById('result-card');
const packageForm = document.getElementById('package-form');
const packageTuaSelect = document.getElementById('package-tua');
const packageFurSelect = document.getElementById('package-loai-tua');
const packagePetCheckbox = document.getElementById('package-pet');
const packageUntangleInput = document.getElementById('package-untangle-price');
const retailForm = document.getElementById('retail-form');
const retailPriceInput = document.getElementById('retail-price');
const retailUntangleInput = document.getElementById('retail-untangle-price');
const retailPercentInput = document.getElementById('retail-percent');
const mainTabs = document.querySelectorAll('[data-main-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');
const showPriceGridBtn = document.getElementById('show-price-grid');
const priceGridCard = document.getElementById('price-grid-card');
const priceGridContent = document.getElementById('price-grid-content');
const closePriceGridBtn = document.getElementById('close-price-grid');
const priceGridTabs = document.querySelectorAll('[data-price-tab]');
const packagePanel = document.getElementById('package-panel');
const retailPanel = document.getElementById('retail-panel');
const customSelectWrappers = document.querySelectorAll('.custom-select');
const packageSwitchControl = packagePetCheckbox?.closest('.switch-control');

const getPetType = (checkboxId) => {
    const checkbox = document.getElementById(checkboxId);
    return checkbox.checked ? 'Mèo' : 'Chó';
};

const getSelectedValues = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return [];
    if (field.tagName === 'SELECT') {
        return Array.from(field.selectedOptions).map((option) => option.value);
    }
    return Array.from(field.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value);
};

const getSelectedCheckboxDetails = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return [];
    return Array.from(field.querySelectorAll('input[type="checkbox"]:checked')).map((input) => ({
        value: Number(input.value) || 0,
        label: input.parentElement?.textContent.trim() || input.value,
    }));
};

const priceData = {
    bang_gia: {
        cho: [
            {
                can_nang: '<1kg',
                goi: {
                    '10_buoc': { long_sat: 6400, long_dai: 6400 },
                    '12_buoc': { long_sat: 9600, long_dai: 9600 },
                    '18_buoc': { long_sat: 16000, long_dai: 16000 },
                    cao: { day_du: 18000, toan_dien: 26000 },
                    cat_tia: { day_du: 36000, toan_dien: 42400 },
                },
            },
            {
                can_nang: '1-3kg',
                goi: {
                    '10_buoc': { long_sat: 8000, long_dai: 8000 },
                    '12_buoc': { long_sat: 11200, long_dai: 11200 },
                    '18_buoc': { long_sat: 17600, long_dai: 17600 },
                    cao: { day_du: 20000, toan_dien: 28000 },
                    cat_tia: { day_du: 40800, toan_dien: 47200 },
                },
            },
            {
                can_nang: '3-5kg',
                goi: {
                    '10_buoc': { long_sat: 11200, long_dai: 11200 },
                    '12_buoc': { long_sat: 14400, long_dai: 14400 },
                    '18_buoc': { long_sat: 20800, long_dai: 20800 },
                    cao: { day_du: 24000, toan_dien: 32000 },
                    cat_tia: { day_du: 43200, toan_dien: 49600 },
                },
            },
            {
                can_nang: '5-8kg',
                goi: {
                    '10_buoc': { long_sat: 12000, long_dai: 13600 },
                    '12_buoc': { long_sat: 16000, long_dai: 17600 },
                    '18_buoc': { long_sat: 22400, long_dai: 24000 },
                    cao: { day_du: 28000, toan_dien: 36000 },
                    cat_tia: { day_du: 50400, toan_dien: 56800 },
                },
            },
            {
                can_nang: '8-12kg',
                goi: {
                    '10_buoc': { long_sat: 14400, long_dai: 17600 },
                    '12_buoc': { long_sat: 18400, long_dai: 21600 },
                    '18_buoc': { long_sat: 24800, long_dai: 28000 },
                    cao: { day_du: 33000, toan_dien: 41000 },
                    cat_tia: { day_du: 57600, toan_dien: 64000 },
                },
            },
            {
                can_nang: '12-15kg',
                goi: {
                    '10_buoc': { long_sat: 16000, long_dai: 19200 },
                    '12_buoc': { long_sat: 20000, long_dai: 23200 },
                    '18_buoc': { long_sat: 26400, long_dai: 29600 },
                    cao: { day_du: 35000, toan_dien: 43000 },
                    cat_tia: { day_du: 60000, toan_dien: 66400 },
                },
            },
            {
                can_nang: '15-20kg',
                goi: {
                    '10_buoc': { long_sat: 19200, long_dai: 22400 },
                    '12_buoc': { long_sat: 23200, long_dai: 26400 },
                    '18_buoc': { long_sat: 29600, long_dai: 32800 },
                    cao: { day_du: 40000, toan_dien: 48000 },
                    cat_tia: { day_du: 66400, toan_dien: 72800 },
                },
            },
            {
                can_nang: '20-30kg',
                goi: {
                    '10_buoc': { long_sat: 24000, long_dai: 28000 },
                    '12_buoc': { long_sat: 28000, long_dai: 32000 },
                    '18_buoc': { long_sat: 34400, long_dai: 38400 },
                    cao: { day_du: 48000, toan_dien: 56000 },
                    cat_tia: { day_du: 78400, toan_dien: 84800 },
                },
            },
        ],
        meo: [
            {
                can_nang: '<1kg',
                goi: {
                    '10_buoc': { khong_long: 8000, long_dai: 8000 },
                    '12_buoc': { khong_long: 11200, long_dai: 11200 },
                    '18_buoc': { long_sat: 17600, long_dai: 17600 },
                    cao: { day_du: 22000, toan_dien: 30000 },
                    cat_tia: { day_du: 36000, toan_dien: 42400 },
                },
            },
            {
                can_nang: '1-3kg',
                goi: {
                    '10_buoc': { khong_long: 9600, long_dai: 9600 },
                    '12_buoc': { khong_long: 14400, long_dai: 14400 },
                    '18_buoc': { long_sat: 20800, long_dai: 20800 },
                    cao: { day_du: 26000, toan_dien: 34000 },
                    cat_tia: { day_du: 40800, toan_dien: 47200 },
                },
            },
            {
                can_nang: '3-5kg',
                goi: {
                    '10_buoc': { khong_long: 12800, long_dai: 12800 },
                    '12_buoc': { khong_long: 16000, long_dai: 17600 },
                    '18_buoc': { khong_long: 22400, long_dai: 24000 },
                    cao: { day_du: 30000, toan_dien: 38000 },
                    cat_tia: { day_du: 45600, toan_dien: 52000 },
                },
            },
            {
                can_nang: '5-8kg',
                goi: {
                    '10_buoc': { khong_long: 14400, long_dai: 16000 },
                    '12_buoc': { khong_long: 17600, long_dai: 19200 },
                    '18_buoc': { khong_long: 24000, long_dai: 25600 },
                    cao: { day_du: 32000, toan_dien: 40000 },
                    cat_tia: { day_du: 50400, toan_dien: 56800 },
                },
            },
            {
                can_nang: '8-12kg',
                goi: {
                    '10_buoc': { khong_long: 16000, long_dai: 17600 },
                    '12_buoc': { khong_long: 20800, long_dai: 22400 },
                    '18_buoc': { khong_long: 27200, long_dai: 28800 },
                    cao: { day_du: 36000, toan_dien: 44000 },
                    cat_tia: { day_du: 55200, toan_dien: 61600 },
                },
            },
        ],
        dich_vu_le: {
            danh_rang: 7000,
            combo_vip: 8000,
            tam_thao_moc: 10000,
            tam_trang: 10000,
            hap_dau: 10000,
            spa_express: 10000,
            tam_ve: 10000,
            tay_cau: 15000,
            cat_mong: 15000,
        },
    },
};

const serviceDisplayNames = {
    danh_rang: 'Đánh răng/7k',
    combo_vip: 'Combo Vip/8k',
    tam_thao_moc: 'Tắm thảo mọc/10k',
    tam_trang: 'Tắm trắng/10k',
    hap_dau: 'Hấp dầu/10k',
    spa_express: 'Spa Express/10k',
    tam_ve: 'Tắm ve/10k',
    tay_cau: 'Tẩy dầu/15k',
    cat_mong: 'Cắt móng/15k',
};

const furOptionMap = {
    cho: {
        '10_buoc': [
            { value: 'long_dai', label: 'Lông dài' },
            { value: 'long_sat', label: 'Lông sát' },
        ],
        '12_buoc': [
            { value: 'long_dai', label: 'Lông dài' },
            { value: 'long_sat', label: 'Lông sát' },
        ],
        '18_buoc': [
            { value: 'long_dai', label: 'Lông dài' },
            { value: 'long_sat', label: 'Lông sát' },
        ],
        cao: [
            { value: 'day_du', label: 'Đầy đủ' },
            { value: 'toan_dien', label: 'Toàn diện' },
        ],
        cat_tia: [
            { value: 'day_du', label: 'Đầy đủ' },
            { value: 'toan_dien', label: 'Toàn diện' },
        ],
    },
    meo: {
        '10_buoc': [
            { value: 'long_dai', label: 'Lông dài' },
            { value: 'khong_long', label: 'Không lông' },
        ],
        '12_buoc': [
            { value: 'long_dai', label: 'Lông dài' },
            { value: 'khong_long', label: 'Không lông' },
        ],
        '18_buoc': [
            { value: 'long_dai', label: 'Lông dài' },
            { value: 'long_sat', label: 'Lông sát' },
        ],
        cao: [
            { value: 'day_du', label: 'Đầy đủ' },
            { value: 'toan_dien', label: 'Toàn diện' },
        ],
        cat_tia: [
            { value: 'day_du', label: 'Đầy đủ' },
            { value: 'toan_dien', label: 'Toàn diện' },
        ],
    },
};

const getPetTypeKey = (checkboxId) => {
    const checkbox = document.getElementById(checkboxId);
    return checkbox?.checked ? 'meo' : 'cho';
};

const getDefaultFurOption = (options) => {
    if (!Array.isArray(options) || options.length === 0) return '';
    return options.find((option) => option.value === 'long_dai')?.value
        || options.find((option) => option.value === 'day_du')?.value
        || options[0].value;
};

const updatePackageFurOptions = (petTypeKey, packageKey) => {
    if (!packageFurSelect) return;
    const options = furOptionMap[petTypeKey]?.[packageKey] || [];
    const selectedValue = packageFurSelect.value;

    packageFurSelect.innerHTML = options
        .map((option) => `<option value="${option.value}">${option.label}</option>`)
        .join('');

    if (options.some((option) => option.value === selectedValue)) {
        packageFurSelect.value = selectedValue;
    } else {
        packageFurSelect.value = getDefaultFurOption(options);
    }

    packageFurSelect.dispatchEvent(new Event('change'));
};

const getWeightRange = (weight) => {
    if (weight < 1) return '<1kg';
    if (weight <= 3) return '1-3kg';
    if (weight <= 5) return '3-5kg';
    if (weight <= 8) return '5-8kg';
    if (weight <= 12) return '8-12kg';
    if (weight <= 15) return '12-15kg';
    if (weight <= 20) return '15-20kg';
    if (weight <= 30) return '20-30kg';
    return null;
};

const getPackagePrice = ({ petType, weight, packageKey, furKey }) => {
    const weightRange = getWeightRange(weight);
    if (!weightRange) return null;

    const animalData = priceData.bang_gia[petType];
    if (!animalData) return null;

    const weightGroup = animalData.find((item) => item.can_nang === weightRange);
    if (!weightGroup?.goi) return null;

    const packageItem = weightGroup.goi[packageKey];
    if (!packageItem) return null;

    return packageItem[furKey];
};

const getServicePrice = (serviceKey) => {
    return priceData.bang_gia.dich_vu_le[serviceKey] || 0;
};

const getSelectedServiceLabels = (fieldId) => {
    return getSelectedValues(fieldId).map((key) => serviceDisplayNames[key] || key);
};

const formatCurrency = (value) => {
    return Number(value).toLocaleString('vi-VN');
};

const furLabelMap = {
    long_sat: 'Lông sát',
    long_dai: 'Lông dài',
    khong_long: 'Không lông',
    day_du: 'Đầy đủ',
    toan_dien: 'Toàn diện',
};

const petHeaders = {
    cho: {
        '10_buoc': [
            { keys: ['long_sat'], label: 'Lông sát' },
            { keys: ['long_dai'], label: 'Lông dài' }
        ],
        '12_buoc': [
            { keys: ['long_sat'], label: 'Lông sát' },
            { keys: ['long_dai'], label: 'Lông dài' }
        ],
        '18_buoc': [
            { keys: ['long_sat'], label: 'Lông sát' },
            { keys: ['long_dai'], label: 'Lông dài' }
        ],
        'cao': [
            { keys: ['day_du'], label: 'Đầy đủ' },
            { keys: ['toan_dien'], label: 'Toàn diện' }
        ],
        'cat_tia': [
            { keys: ['day_du'], label: 'Đầy đủ' },
            { keys: ['toan_dien'], label: 'Toàn diện' }
        ]
    },
    meo: {
        '10_buoc': [
            { keys: ['khong_long'], label: 'Không lông' },
            { keys: ['long_dai'], label: 'Lông dài' }
        ],
        '12_buoc': [
            { keys: ['khong_long'], label: 'Không lông' },
            { keys: ['long_dai'], label: 'Lông dài' }
        ],
        '18_buoc': [
            { keys: ['khong_long', 'long_sat'], label: 'Không lông / Sát' },
            { keys: ['long_dai'], label: 'Lông dài' }
        ],
        'cao': [
            { keys: ['day_du'], label: 'Đầy đủ' },
            { keys: ['toan_dien'], label: 'Toàn diện' }
        ],
        'cat_tia': [
            { keys: ['day_du'], label: 'Đầy đủ' },
            { keys: ['toan_dien'], label: 'Toàn diện' }
        ]
    }
};

let activePriceTab = 'cho';

const createElement = (tagName, className, textContent) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (typeof textContent === 'string') {
        element.textContent = textContent;
    }
    return element;
};

const getSubOptionPrice = (goiData, subOptKeys) => {
    if (!goiData) return '-';
    const keys = Array.isArray(subOptKeys) ? subOptKeys : [subOptKeys];
    for (const key of keys) {
        if (goiData[key] !== undefined) {
            return `${formatCurrency(goiData[key])}`;
        }
    }
    return '-';
};

const buildPriceTable = (rows, petType) => {
    const tableWrap = document.createElement('div');
    tableWrap.className = 'price-grid-table-wrap';

    const table = document.createElement('table');
    table.className = 'price-grid-table';

    const thead = document.createElement('thead');
    
    // Row 1 of headers
    const headRow1 = document.createElement('tr');
    const thWeight = document.createElement('th');
    thWeight.textContent = 'Cân nặng';
    thWeight.rowSpan = 2;
    headRow1.appendChild(thWeight);

    const packages = [
        { key: '10_buoc', label: '10 bước' },
        { key: '12_buoc', label: '12 bước' },
        { key: '18_buoc', label: '18 bước' },
        { key: 'cao', label: 'Cạo' },
        { key: 'cat_tia', label: 'Cắt/Tỉa' }
    ];

    packages.forEach(pkg => {
        const th = document.createElement('th');
        th.textContent = pkg.label;
        th.colSpan = 2;
        headRow1.appendChild(th);
    });
    thead.appendChild(headRow1);

    // Row 2 of headers
    const headRow2 = document.createElement('tr');
    packages.forEach(pkg => {
        const opts = petHeaders[petType]?.[pkg.key] || [];
        opts.forEach(opt => {
            const th = document.createElement('th');
            th.textContent = opt.label;
            headRow2.appendChild(th);
        });
    });
    thead.appendChild(headRow2);
    table.appendChild(thead);

    // Body rows
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        
        // Weight column
        const tdWeight = document.createElement('td');
        tdWeight.textContent = row.can_nang;
        tr.appendChild(tdWeight);

        // Package columns
        packages.forEach(pkg => {
            const goiData = row.goi?.[pkg.key];
            const opts = petHeaders[petType]?.[pkg.key] || [];
            opts.forEach(opt => {
                const td = document.createElement('td');
                td.textContent = getSubOptionPrice(goiData, opt.keys);
                tr.appendChild(td);
            });
        });
        
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    return tableWrap;
};

const updatePriceTabsUI = () => {
    priceGridTabs.forEach((tab) => {
        const isActive = tab.dataset.priceTab === activePriceTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
};

const renderPriceGrid = (tabKey = activePriceTab) => {
    if (!priceGridContent) return;
    activePriceTab = tabKey;
    priceGridContent.textContent = '';

    const caption = createElement(
        'p',
        'price-grid-caption',
        '* Vuốt ngang để xem đầy đủ bảng giá'
    );

    priceGridContent.appendChild(caption);
    priceGridContent.appendChild(buildPriceTable(priceData.bang_gia[tabKey] || [], tabKey));
    updatePriceTabsUI();
};

const getCurrencyValue = (el) => {
    if (!el) return 0;
    
    // Lấy các chữ số từ value hiện tại của ô input
    const valueDigits = String(el.value || '').replaceAll(/\D/g, '');
    const rawDigits = String(el.dataset.raw || '').replaceAll(/\D/g, '');
    
    // Ưu tiên rawDigits nếu nó có giá trị và dài (đã xử lý xong)
    // Hoặc parse lại từ valueDigits nếu nó là giá trị thô
    let finalDigits = rawDigits || valueDigits;

    if (!finalDigits) {
        return 0;
    }

    // Xử lý riêng cho retail-price (tự thêm 000 nếu nhập 1-3 số)
    if (el.id === 'retail-price') {
        // Nếu người dùng nhập 1-3 số, tự nhân 1000
        if (finalDigits.length > 0 && finalDigits.length <= 3) {
            const base = finalDigits;
            el.dataset.base = base;
            finalDigits = `${base}000`;
            el.dataset.raw = finalDigits;
        }
    } else {
        el.dataset.raw = finalDigits;
    }

    return Number(finalDigits);
};

const restrictNumericInput = (inputId, allowDecimal = false) => {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('input', () => {
        let value = input.value;
        const pattern = allowDecimal ? /[^0-9.,]/g : /\D/g;
        value = value.replace(pattern, '');

        if (allowDecimal) {
            value = value.replaceAll(',', '.');
            const parts = value.split('.');
            if (parts.length > 2) {
                value = `${parts[0]}.${parts.slice(1).join('')}`;
            }
        }

        input.value = value;
    });
};

const setCustomValidation = (element, message) => {
    if (!element) return;
    element.addEventListener('invalid', () => {
        element.setCustomValidity(message);
    });
    element.addEventListener('input', () => {
        element.setCustomValidity('');
    });
    element.addEventListener('change', () => {
        element.setCustomValidity('');
    });
};

const parseNumericValue = (value) => {
    const cleaned = String(value).replaceAll(/[^\d]/g, '');
    return cleaned === '' ? null : Number(cleaned);
};

const formatCurrencyInput = (value) => {
    if (!value) return '';
    const rawNumber = parseNumericValue(value);
    if (Number.isNaN(rawNumber)) return '';
    return `${new Intl.NumberFormat('vi-VN').format(rawNumber)} VNĐ`;
};

const formatPercentInput = (value) => {
    if (!value) return '';
    const rawNumber = parseNumericValue(value);
    if (Number.isNaN(rawNumber)) return '';
    return `${rawNumber}%`;
};

const closeCustomSelect = (wrapper) => {
    if (!wrapper) return;
    wrapper.classList.remove('open');
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const popup = wrapper.querySelector('.custom-select-popup');
    if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
    }
    if (popup) {
        popup.classList.add('hidden');
    }
};

const closeAllCustomSelects = () => {
    customSelectWrappers.forEach((wrapper) => closeCustomSelect(wrapper));
};

const syncCustomSelectUI = (selectEl) => {
    if (!selectEl) return;
    selectEl.dispatchEvent(new Event('change', { bubbles: true }));
};

const renderCustomSelectOptions = (wrapper, selectEl) => {
    const popup = wrapper.querySelector('.custom-select-popup');
    const label = wrapper.querySelector('.custom-select-label');
    if (!popup || !label || !selectEl) return;

    const options = Array.from(selectEl.options);
    const selectedOption = options.find((option) => option.selected) || options[0];
    label.textContent = selectedOption ? selectedOption.textContent : 'Chọn';
    popup.innerHTML = '';

    options.forEach((option) => {
        const optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'custom-select-option';
        optionButton.textContent = option.textContent;
        optionButton.dataset.value = option.value;
        optionButton.setAttribute('role', 'option');
        optionButton.setAttribute('aria-selected', option.selected ? 'true' : 'false');

        if (option.selected) {
            optionButton.classList.add('is-selected');
        }

        optionButton.addEventListener('click', () => {
            selectEl.value = option.value;
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            closeCustomSelect(wrapper);
        });

        popup.appendChild(optionButton);
    });
};

const setupCustomSelects = () => {
    customSelectWrappers.forEach((wrapper) => {
        const selectEl = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-select-trigger');
        if (!selectEl || !trigger) return;

        renderCustomSelectOptions(wrapper, selectEl);

        trigger.addEventListener('click', () => {
            const isOpen = wrapper.classList.contains('open');
            closeAllCustomSelects();

            if (!isOpen) {
                wrapper.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
                wrapper.querySelector('.custom-select-popup')?.classList.remove('hidden');
            }
        });

        selectEl.addEventListener('change', () => {
            renderCustomSelectOptions(wrapper, selectEl);
        });
    });

    document.addEventListener('click', (event) => {
        customSelectWrappers.forEach((wrapper) => {
            if (!wrapper.contains(event.target)) {
                closeCustomSelect(wrapper);
            }
        });
    });
};

const syncCheckboxCards = () => {
    document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach((input) => {
        const parent = input.closest('.checkbox-item');
        if (!parent) return;

        const updateState = () => {
            parent.classList.toggle('is-checked', input.checked);
        };

        input.addEventListener('change', updateState);
        updateState();
    });
};

const refreshCheckboxCardStates = () => {
    document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach((input) => {
        input.closest('.checkbox-item')?.classList.toggle('is-checked', input.checked);
    });
};

const updateServiceSummary = (group) => {
    const summary = group.querySelector('[data-service-summary]');
    if (!summary) return;
    const selectedLabels = Array.from(group.querySelectorAll('.checkbox-item input[type="checkbox"]:checked'))
        .map((input) => input.parentElement?.textContent.trim())
        .filter(Boolean);

    if (selectedLabels.length === 0) {
        summary.textContent = 'Chưa chọn dịch vụ';
        return;
    }

    if (selectedLabels.length === 1) {
        summary.textContent = selectedLabels[0];
        return;
    }

    summary.textContent = `${selectedLabels.length} dịch vụ đã chọn`;
};

const setupServiceSheets = () => {
    document.querySelectorAll('[data-service-sheet]').forEach((group) => {
        const toggle = group.querySelector('[data-service-toggle]');
        const panel = group.querySelector('[data-service-panel]');
        const closeBtn = group.querySelector('[data-service-close]');
        if (!toggle || !panel) return;

        const openSheet = () => {
            panel.classList.remove('hidden');
            if (typeof panel.showModal === 'function') {
                try {
                    if (!panel.open) {
                        panel.showModal();
                    }
                } catch (e) {
                    panel.setAttribute('open', '');
                }
            } else {
                panel.setAttribute('open', '');
            }
        };

        const closeSheet = () => {
            if (typeof panel.close === 'function' && panel.open) {
                panel.close();
            }
            panel.classList.add('hidden');
        };

        updateServiceSummary(group);

        toggle.addEventListener('click', () => {
            openSheet();
        });

        closeBtn?.addEventListener('click', closeSheet);

        panel.addEventListener('cancel', (event) => {
            event.preventDefault();
            closeSheet();
        });

        panel.addEventListener('close', () => {
            panel.classList.add('hidden');
        });

        group.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach((input) => {
            input.addEventListener('change', () => {
                refreshCheckboxCardStates();
                updateServiceSummary(group);
            });
        });
    });
};

const setupCurrencyInputs = () => {
    document.querySelectorAll('.currency').forEach(input => {
        input.dataset.raw = '';
        input.dataset.base = '';

        input.addEventListener('input', e => {
            if (e.target.id === 'retail-price' || e.target.id === 'retail-untangle-price' || e.target.id === 'package-untangle-price') {
                const base = e.target.value.replaceAll(/\D/g, '').slice(0, 3);
                e.target.dataset.base = base;
                e.target.dataset.raw = base ? `${base}000` : '';
                e.target.value = base;
                return;
            }
            const raw = e.target.value.replaceAll(/\D/g, '');
            e.target.dataset.raw = raw;
            e.target.value = raw ? formatCurrency(raw) : '';
        });

        input.addEventListener('focus', e => {
            if (e.target.id === 'retail-price' || e.target.id === 'retail-untangle-price' || e.target.id === 'package-untangle-price') {
                e.target.value = e.target.dataset.base || '';
            }
        });

        input.addEventListener('blur', e => {
            if (e.target.id === 'retail-price' || e.target.id === 'retail-untangle-price' || e.target.id === 'package-untangle-price') {
                if (!e.target.dataset.raw && e.target.value) {
                    const base = e.target.value.replaceAll(/\D/g, '').slice(0, 3);
                    e.target.dataset.base = base;
                    e.target.dataset.raw = base ? `${base}000` : '';
                }
                const raw = e.target.dataset.raw || '';
                e.target.value = raw ? `${formatCurrency(raw)} VNĐ` : '';
            }
        });

        input.addEventListener('change', e => {
            if (!e.target.dataset.raw) {
                e.target.value = '';
                return;
            }
            e.target.value = `${formatCurrency(e.target.dataset.raw)} VNĐ`;
        });
    });
};

restrictNumericInput('package-weight', true);
restrictNumericInput('retail-percent', false);
setupCurrencyInputs();
setupCustomSelects();
setupServiceSheets();
syncCheckboxCards();

if (retailPercentInput) {
    retailPercentInput.addEventListener('focus', () => {
        retailPercentInput.value = retailPercentInput.value.replaceAll(/\D/g, '');
    });
    retailPercentInput.addEventListener('blur', () => {
        retailPercentInput.value = formatPercentInput(retailPercentInput.value);
    });
}

const syncPackageOptions = () => {
    if (packageSwitchControl && packagePetCheckbox) {
        packageSwitchControl.classList.toggle('is-dog', !packagePetCheckbox.checked);
        packageSwitchControl.classList.toggle('is-cat', packagePetCheckbox.checked);
    }
    updatePackageFurOptions(getPetTypeKey('package-pet'), packageTuaSelect?.value);
};
if (packagePetCheckbox) {
    packagePetCheckbox.addEventListener('change', syncPackageOptions);
}
if (packageTuaSelect) {
    packageTuaSelect.addEventListener('change', syncPackageOptions);
}
syncPackageOptions();

const showResultCard = () => {
    if (!resultCard) return;
    resultCard.classList.remove('hidden');
    if (typeof resultCard.showModal === 'function') {
        try {
            if (!resultCard.open) {
                resultCard.showModal();
            }
        } catch (e) {
            resultCard.setAttribute('open', '');
        }
    } else {
        resultCard.setAttribute('open', '');
    }
};

const renderResult = (title, details) => {
    resultContent.textContent = '';
    const summary = document.createElement('div');
    summary.className = 'result-summary';

    const summaryLabel = document.createElement('div');
    summaryLabel.className = 'result-summary-label';
    summaryLabel.textContent = 'Tong ket';

    const summaryValue = document.createElement('div');
    summaryValue.className = 'result-summary-value';
    summaryValue.textContent = title;

    summary.appendChild(summaryLabel);
    summary.appendChild(summaryValue);

    const detailList = document.createElement('div');
    detailList.className = 'result-details';

    details.forEach(({ label, value }) => {
        const row = document.createElement('div');
        row.className = 'result-row';

        const rowLabel = document.createElement('span');
        rowLabel.className = 'result-row-label';
        rowLabel.textContent = label;

        const rowValue = document.createElement('span');
        rowValue.className = 'result-row-value';
        rowValue.textContent = value;

        row.appendChild(rowLabel);
        row.appendChild(rowValue);
        detailList.appendChild(row);
    });

    resultContent.appendChild(summary);
    resultContent.appendChild(detailList);
    showResultCard();
};

const renderErrors = (errors) => {
    renderResult('Can kiem tra lai du lieu', errors.map((error, index) => ({
        label: `Loi ${index + 1}`,
        value: error,
    })));
};

let activeFormType = null;

const closeResultPopup = () => {
    if (typeof resultCard.close === 'function' && resultCard.open) {
        resultCard.close();
    }
    resultCard.classList.add('hidden');
};

const showPriceGrid = () => {
    if (!priceGridCard) return;
    renderPriceGrid(activePriceTab);
    priceGridCard.classList.remove('hidden');
    if (typeof priceGridCard.showModal === 'function') {
        try {
            if (!priceGridCard.open) {
                priceGridCard.showModal();
            }
        } catch (e) {
            priceGridCard.setAttribute('open', '');
        }
    } else {
        priceGridCard.setAttribute('open', '');
    }
};

const closePriceGrid = () => {
    if (!priceGridCard) return;
    if (typeof priceGridCard.close === 'function' && priceGridCard.open) {
        priceGridCard.close();
    }
    priceGridCard.classList.add('hidden');
};

if (resultCard && typeof resultCard.addEventListener === 'function') {
    resultCard.addEventListener('cancel', (event) => {
        event.preventDefault();
        closeResultPopup();
    });
    resultCard.addEventListener('close', () => {
        resultCard.classList.add('hidden');
    });
}

if (priceGridCard && typeof priceGridCard.addEventListener === 'function') {
    priceGridCard.addEventListener('cancel', (event) => {
        event.preventDefault();
        closePriceGrid();
    });
    priceGridCard.addEventListener('close', () => {
        priceGridCard.classList.add('hidden');
    });
}

priceGridTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        renderPriceGrid(tab.dataset.priceTab || 'cho');
    });
});

const resetActiveForm = () => {
    if (activeFormType === 'package') {
        packageForm.reset();
        if (packageUntangleInput) {
            packageUntangleInput.dataset.raw = '';
            packageUntangleInput.value = '';
        }
        syncCustomSelectUI(packageTuaSelect);
        syncPackageOptions();
    } else if (activeFormType === 'retail') {
        retailForm.reset();
        if (retailPriceInput) {
            retailPriceInput.dataset.raw = '';
            retailPriceInput.dataset.base = '';
            retailPriceInput.value = '';
        }
        if (retailUntangleInput) {
            retailUntangleInput.dataset.raw = '';
            retailUntangleInput.value = '';
        }
        if (retailPercentInput) {
            retailPercentInput.value = '';
        }
    }
    refreshCheckboxCardStates();
};

const resetPackageForm = () => {
    packageForm.reset();
    if (packageUntangleInput) {
        packageUntangleInput.dataset.raw = '';
        packageUntangleInput.value = '';
    }
    syncCustomSelectUI(packageTuaSelect);
    syncPackageOptions();
    refreshCheckboxCardStates();
};

const resetRetailForm = () => {
    retailForm.reset();
    if (retailPriceInput) {
        retailPriceInput.dataset.raw = '';
        retailPriceInput.dataset.base = '';
        retailPriceInput.value = '';
    }
    if (retailUntangleInput) {
        retailUntangleInput.dataset.raw = '';
        retailUntangleInput.value = '';
    }
    if (retailPercentInput) {
        retailPercentInput.value = '';
    }
    refreshCheckboxCardStates();
};

const switchMainTab = (tabKey) => {
    if (tabKey === 'package') {
        resetPackageForm();
    } else if (tabKey === 'retail') {
        resetRetailForm();
    }

    activeFormType = tabKey;
    
    mainTabs.forEach(tab => {
        const isActive = tab.dataset.mainTab === tabKey;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    tabPanels.forEach(panel => {
        const id = panel.id;
        const targetId = `${tabKey}-panel`;
        const isActive = id === targetId;
        panel.classList.toggle('hidden', !isActive);
        panel.classList.toggle('is-active-panel', isActive);
        panel.setAttribute('data-active', isActive ? 'true' : 'false');
    });

    if (tabKey === 'package') {
        updatePackageFurOptions(getPetTypeKey('package-pet'), packageTuaSelect?.value);
    }

    closeResultPopup();
};

mainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchMainTab(tab.dataset.mainTab);
    });
});

if (showPriceGridBtn) {
    showPriceGridBtn.addEventListener('click', showPriceGrid);
}

// Set initial active state
switchMainTab('package');

const cancelResultBtn = document.getElementById('cancel-result');
const resetResultBtn = document.getElementById('reset-result');
if (cancelResultBtn) {
    cancelResultBtn.addEventListener('click', closeResultPopup);
}
if (resetResultBtn) {
    resetResultBtn.addEventListener('click', () => {
        resetActiveForm();
        closeResultPopup();
    });
}
if (closePriceGridBtn) {
    closePriceGridBtn.addEventListener('click', closePriceGrid);
}

packageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const petType = getPetType('package-pet');
    const weightValue = document.getElementById('package-weight').value.trim();
    const untanglePrice = getCurrencyValue(packageUntangleInput);
    const tua = document.getElementById('package-tua').value;
    const loaiTua = document.getElementById('package-loai-tua').value;
    const services = getSelectedValues('package-service-group');
    const weight = Number(weightValue);
    const errors = [];

    if (!weightValue) {
        errors.push('Cân nặng là bắt buộc.');
    } else if (Number.isNaN(weight) || weight <= 0) {
        errors.push('Cân nặng phải là số lớn hơn 0.');
    }

    const packagePrice = getPackagePrice({
        petType: getPetTypeKey('package-pet'),
        weight,
        packageKey: tua,
        furKey: loaiTua,
    });

    if (packagePrice === null || Number.isNaN(packagePrice)) {
        errors.push('Không tìm thấy giá gói cho lựa chọn hiện tại.');
    }

    if (errors.length > 0) {
        renderErrors(errors);
        return;
    }

    const servicePrice = services.reduce((sum, key) => sum + getServicePrice(key), 0);
    const untangleCharge = Math.round(untanglePrice * 0.5);
    const totalPrice = packagePrice + servicePrice + untangleCharge;
    const selectedServiceLabels = getSelectedServiceLabels('package-service-group');

    const results = [
        { label: 'Loại thú cưng', value: petType },
        { label: 'Cân nặng', value: `${weight} kg` },
        { label: 'Chọn tua', value: document.querySelector('#package-tua option:checked').textContent },
        { label: 'Loại tua', value: document.querySelector('#package-loai-tua option:checked').textContent },
    ];

    if (untanglePrice > 0) {
        results.push({ label: 'Giá gỡ rối', value: `${formatCurrency(untanglePrice)} VNĐ` });
        results.push({ label: 'Phụ phí gỡ rối (50%)', value: `${formatCurrency(untangleCharge)} VNĐ` });
    }

    results.push({ label: 'Dịch vụ lẻ', value: selectedServiceLabels.join(', ') || 'Không có' });
    results.push({ label: 'Giá gói', value: `${formatCurrency(packagePrice)} VNĐ` });
    results.push({ label: 'Phụ phí dịch vụ lẻ', value: `${formatCurrency(servicePrice)} VNĐ` });
    results.push({ label: 'Tổng cộng', value: `${formatCurrency(totalPrice)} VNĐ` });

    renderResult(`${formatCurrency(totalPrice)} VNĐ`, results);
});

retailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Đảm bảo lấy giá trị mới nhất ngay khi submit
    const price = getCurrencyValue(retailPriceInput);
    const untanglePrice = getCurrencyValue(retailUntangleInput);
    const percentRaw = retailPercentInput.value.trim();
    const serviceItems = getSelectedCheckboxDetails('retail-service-group');
    const percent = parseNumericValue(percentRaw);
    const errors = [];

    if (price <= 0) {
        errors.push('Giá tiền là bắt buộc.');
    } else if (Number.isNaN(price) || price < 0) {
        errors.push('Giá tiền phải là số hợp lệ.');
    }

    if (!percentRaw) {
        errors.push('Phần trăm là bắt buộc.');
    } else if (Number.isNaN(percent) || percent < 0 || percent > 100) {
        errors.push('Phần trăm phải là số từ 0 đến 100.');
    }

    if (errors.length > 0) {
        renderErrors(errors);
        return;
    }

    const servicePrice = serviceItems.reduce((sum, item) => sum + item.value, 0);
    const percentAmount = Math.round(price * (percent / 100));
    const untangleCharge = Math.round(untanglePrice * 0.5);
    const selectedServiceLabels = serviceItems.map((item) => `${item.label}(${formatCurrency(item.value)} VNĐ)`);
    
    // Cộng thêm 50% giá gỡ rối vào tổng tiền
    const totalPrice = percentAmount + servicePrice + untangleCharge;

    const results = [
        { label: 'Giá tiền', value: `${formatCurrency(price)} VNĐ` },
        { label: 'Phần trăm', value: `${percent}%` },
    ];

    if (untanglePrice > 0) {
        results.push({ label: 'Giá gỡ rối', value: `${formatCurrency(untanglePrice)} VNĐ` });
        results.push({ label: 'Phụ phí gỡ rối (50%)', value: `${formatCurrency(untangleCharge)} VNĐ` });
    }

    results.push({ label: 'Dịch vụ lẻ', value: selectedServiceLabels.join(', ') || 'Không có' });
    results.push({ label: 'Số tiền phần trăm', value: `${formatCurrency(percentAmount)} VNĐ` });
    results.push({ label: 'Tổng dịch vụ lẻ', value: `${formatCurrency(servicePrice)} VNĐ` });
    results.push({ label: 'Tổng cộng', value: `${formatCurrency(totalPrice)} VNĐ` });

    renderResult(`${formatCurrency(totalPrice)} VNĐ`, results);
});