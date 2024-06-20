// ==UserScript==
// @name         Block Specific Elements on Webpages
// @namespace    http://your-namespace.com/
// @version      1.0
// @description  Block specific elements on mail.aol.com, outlook.live.com, and mail.yahoo.com
// @author       Your Name
// @match        *://mail.aol.com/*
// @match        *://outlook.live.com/*
// @match        *://mail.yahoo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rules = [
        { domain: 'mail.aol.com', selectors: [
            '#app > div.H_6D6F.W_3mS5W:nth-child(2) > div:last-child > div > div.W_6D6F.iy_h > div:first-child > div > div.W_6D6F.p_R:last-child > div > ul.M_0.P_0:nth-child(2) > li.H_A.hd_n:nth-child(10) > div > div.I_rQUPv.c10zpPw_Z1ubMkV:last-child > div > a.r_P.bn_dBP.bm_FJ.bj_ZpQYvz.D_F.i_6LEV.ab_C.H_A.k_w.I_ZkbNhI.ek_BB.X_6Fd5.N_6FIA.gl_C.P_0',
            '#app > div.I_ZS20V7.D_F.em_N.o_h.W_6D6F.H_6D6F:nth-child(4) > div.D_F.em_N.o_h.s_1HCsWR > div.a_3rehn.W_3o4BO.s_3o4BO.cZ10Gnkk_d5Y.D_F.ek_BB.em_0:first-child > nav.em_N.je_6Fd5.D_F.W_6D6F.H_6D6F.iz_A > div.p_R.Z_0.em_N.W_6D6F.D_F.ek_BB.C_ZkbNhI.navigation > div.Y_fq7.P_Z1jXKuU.D_B.iz_A.iy_h.it_68UO:last-child > div.folder-list.p_R.k_w.W_6D6F.U_3mS2U:first-child > ul.hd_n.P_0.M_0.ci33_ak5iz.D33_B.cl33_FJ.cm33_dBP.Y33_U.U33_U.dq33_hP:first-child > li > a.D_F.k_w.W_6D6F.H_6NIX.A_6EqO.c1AVi7a_6UbO.c1AVi73_6FsP.X_6DEy.N_fq7.ab_C.C_ZkbNhI.I4_2tvNsT.is_26ISAR.cZdTOHS_ZXgLQ3',
            '#ybar-inner-wrap > div._yb_939gpg._yb_15zwydu:last-child > div._yb_1py0pku._yb_h713lt > div._yb_7esnua.ybar-menu-hover-open:last-child > div._yb_g20ux9:last-child > a._yb_1yhs1kc'
        ]},
        { domain: 'outlook.live.com', selectors: [
            '#app > div > div > main.CdnzG.GCT2N:nth-child(3) > div > div > div:nth-child(5) > div.wOYnU'
        ]},
        { domain: 'mail.yahoo.com', selectors: [
            '#ybar-topnavigation > ul._yb_7xxajv._yb_1w29iwz',
            '#ybar-topnavigation > ul._yb_x50x0c._yb_1dtyd78',
            '#ybar-inner-wrap > div._yb_939gpg._yb_15zwydu:last-child > div._yb_1py0pku._yb_h713lt > div._yb_7esnua.ybar-menu-hover-open:last-child > div._yb_g20ux9:last-child > a._yb_1yhs1kc'
        ]}
    ];

    // Function to remove elements by selectors
    function removeElements(selectors) {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.remove());
        });
    }

    // Get the current domain
    const currentDomain = window.location.hostname;

    // Find and apply rules for the current domain
    rules.forEach(rule => {
        if (currentDomain.includes(rule.domain)) {
            removeElements(rule.selectors);
            
            // Observe for dynamically added elements
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes) {
                        removeElements(rule.selectors);
                    }
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }
    });

})();
