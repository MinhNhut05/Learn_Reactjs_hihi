import React from "react";
import "./index.css";

// ============================================
// CHỌN SESSION ĐỂ HIỂN THỊ
// ============================================
const CURRENT_SESSION: "1.5.1" | "1.5.2" | "1.5.3" | "1.5.4" | "1.5.5" | "1.5.6" | "1.5.R" = "1.5.R";

// ============================================
// SESSION 1.5.1 - Core Concepts & Utility-First
// ============================================
import Micro1SpacingSolution from "./exercises/session-1.5.1/Micro1-Spacing-Solution";
import Micro2TypographySolution from "./exercises/session-1.5.1/Micro2-Typography-Solution";
import MiniPriceDisplaySolution from "./exercises/session-1.5.1/Mini-PriceDisplay-Solution";
import RealProductCardSolution from "./exercises/session-1.5.1/Real-ProductCard-Solution";

import Micro1Spacing from "./exercises/session-1.5.1/Micro1-Spacing";
import Micro2Typography from "./exercises/session-1.5.1/Micro2-Typography";
import MiniPriceDisplay from "./exercises/session-1.5.1/Mini-PriceDisplay";
import RealProductCard from "./exercises/session-1.5.1/Real-ProductCard";

// ============================================
// SESSION 1.5.2 - Flexbox & Grid Layout
// ============================================
import Micro1FlexCenteringSolution from "./exercises/session-1.5.2/Micro1-FlexCentering-Solution";
import Micro2GridColumnsSolution from "./exercises/session-1.5.2/Micro2-GridColumns-Solution";
import MiniProductGridSolution from "./exercises/session-1.5.2/Mini-ProductGrid-Solution";
import RealHeaderProductSectionSolution from "./exercises/session-1.5.2/Real-Header-ProductSection-Solution";

import Micro1FlexCentering from "./exercises/session-1.5.2/Micro1-FlexCentering";
import Micro2GridColumns from "./exercises/session-1.5.2/Micro2-GridColumns";
import MiniProductGrid from "./exercises/session-1.5.2/Mini-ProductGrid";
import RealHeaderProductSection from "./exercises/session-1.5.2/Real-Header-ProductSection";

// ============================================
// SESSION 1.5.3 - Responsive Design
// ============================================
import Micro1ResponsiveTextSolution from "./exercises/session-1.5.3/Micro1-ResponsiveText-Solution";
import Micro2ShowHideSolution from "./exercises/session-1.5.3/Micro2-ShowHide-Solution";
import MiniResponsiveCardSolution from "./exercises/session-1.5.3/Mini-ResponsiveCard-Solution";
import RealResponsiveHomepageSolution from "./exercises/session-1.5.3/Real-ResponsiveHomepage-Solution";

import Micro1ResponsiveText from "./exercises/session-1.5.3/Micro1-ResponsiveText";
import Micro2ShowHide from "./exercises/session-1.5.3/Micro2-ShowHide";
import MiniResponsiveCard from "./exercises/session-1.5.3/Mini-ResponsiveCard";
import RealResponsiveHomepage from "./exercises/session-1.5.3/Real-ResponsiveHomepage";

// ============================================
// SESSION 1.5.4 - States & Interactivity
// ============================================
import Micro1HoverButtonSolution from "./session-1.5.4/solutions/Micro1-HoverButton-Solution";
import Micro2FocusInputSolution from "./session-1.5.4/solutions/Micro2-FocusInput-Solution";
import MiniInteractiveCardSolution from "./session-1.5.4/solutions/Mini-InteractiveCard-Solution";
import RealFullInteractivitySolution from "./session-1.5.4/solutions/Real-FullInteractivity-Solution";

import Micro1HoverButton from "./session-1.5.4/exercises/Micro1-HoverButton";
import Micro2FocusInput from "./session-1.5.4/exercises/Micro2-FocusInput";
import MiniInteractiveCard from "./session-1.5.4/exercises/Mini-InteractiveCard";
import RealFullInteractivity from "./session-1.5.4/exercises/Real-FullInteractivity";

// ============================================
// SESSION 1.5.5 - Custom Configuration & Design System
// ============================================
import Micro1CustomColorSolution from "./session-1.5.5/solutions/Micro1-CustomColor-Solution";
import Micro2ApplyDirectiveSolution from "./session-1.5.5/solutions/Micro2-ApplyDirective-Solution";
import MiniDesignTokensSolution from "./session-1.5.5/solutions/Mini-DesignTokens-Solution";
import RealRefactorDesignSystemSolution from "./session-1.5.5/solutions/Real-RefactorDesignSystem-Solution";

import Micro1CustomColor from "./session-1.5.5/exercises/Micro1-CustomColor";
import Micro2ApplyDirective from "./session-1.5.5/exercises/Micro2-ApplyDirective";
import MiniDesignTokens from "./session-1.5.5/exercises/Mini-DesignTokens";
import RealRefactorDesignSystem from "./session-1.5.5/exercises/Real-RefactorDesignSystem";

// ============================================
// SESSION 1.5.6 - Headless UI & Production
// ============================================
import Micro1CVAButtonSolution from "./session-1.5.6/solutions/Micro1-CVAButton-Solution";
import Micro2CNHelperSolution from "./session-1.5.6/solutions/Micro2-CNHelper-Solution";
import MiniModalSolution from "./session-1.5.6/solutions/Mini-Modal-Solution";
import RealEcommerceSolution from "./session-1.5.6/solutions/Real-Ecommerce-Solution";

import Micro1CVAButton from "./session-1.5.6/exercises/Micro1-CVAButton";
import Micro2CNHelper from "./session-1.5.6/exercises/Micro2-CNHelper";
import MiniModal from "./session-1.5.6/exercises/Mini-Modal";
import RealEcommerce from "./session-1.5.6/exercises/Real-Ecommerce";

// ============================================
// SESSION 1.5.R - Review & Polish (Challenges)
// ============================================
import Challenge1Demo from "./session-1.5.R/challenges/01-ProductCard-Challenge";
import Challenge2Demo from "./session-1.5.R/challenges/02-TestimonialCard-Challenge";
import Challenge3Demo from "./session-1.5.R/challenges/03-ResponsiveDebug-Challenge";

function App() {
  return (
    <>
      {CURRENT_SESSION === "1.5.1" && <Session151 />}
      {CURRENT_SESSION === "1.5.2" && <Session152 />}
      {CURRENT_SESSION === "1.5.3" && <Session153 />}
      {CURRENT_SESSION === "1.5.4" && <Session154 />}
      {CURRENT_SESSION === "1.5.5" && <Session155 />}
      {CURRENT_SESSION === "1.5.6" && <Session156 />}
      {CURRENT_SESSION === "1.5.R" && <Session15R />}
    </>
  );
}

// ============================================
// COMPARE BOX - Hiển thị Your Work vs Solution
// ============================================
function CompareBox({
  title,
  yourWork,
  solution,
  fullWidth = false,
}: {
  title: string;
  yourWork: React.ReactNode;
  solution: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        {title}
      </h2>
      <div className={`grid ${fullWidth ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-6`}>
        {/* Your Work */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            Your Work
          </h3>
          <div className="border-2 border-blue-200 rounded-lg overflow-hidden bg-white">
            {yourWork}
          </div>
        </div>

        {/* Solution */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-green-600 uppercase tracking-wide">
            Solution
          </h3>
          <div className="border-2 border-green-200 rounded-lg overflow-hidden bg-white">
            {solution}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SESSION 1.5.1 COMPONENT
// ============================================
function Session151() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Session 1.5.1 - Core Concepts & Utility-First
          </h1>
          <p className="text-gray-600">Topics: Spacing, Typography, Colors</p>
          <p className="text-sm text-gray-500 mt-2">
            💡 So sánh Your Work (trái/trên) với Solution (phải/dưới)
          </p>
        </header>

        <CompareBox
          title="Micro 1: Spacing Classes"
          yourWork={<Micro1Spacing />}
          solution={<Micro1SpacingSolution />}
        />

        <CompareBox
          title="Micro 2: Typography Classes"
          yourWork={<Micro2Typography />}
          solution={<Micro2TypographySolution />}
        />

        <CompareBox
          title="Mini: Price Display"
          yourWork={<MiniPriceDisplay />}
          solution={<MiniPriceDisplaySolution />}
        />

        <CompareBox
          title="Real: ProductCard E-commerce"
          yourWork={<RealProductCard />}
          solution={<RealProductCardSolution />}
        />
      </div>
    </div>
  );
}

// ============================================
// SESSION 1.5.2 COMPONENT
// ============================================
function Session152() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Session 1.5.2 - Flexbox & Grid Layout
          </h1>
          <p className="text-gray-600">Topics: Flex, Grid, Centering, Layout Patterns</p>
          <p className="text-sm text-gray-500 mt-2">
            💡 So sánh Your Work (trái/trên) với Solution (phải/dưới)
          </p>
        </header>

        <CompareBox
          title="Micro 1: Flex Centering"
          yourWork={
            <div className="h-64 overflow-hidden">
              <Micro1FlexCentering />
            </div>
          }
          solution={
            <div className="h-64 overflow-hidden">
              <Micro1FlexCenteringSolution />
            </div>
          }
        />

        <CompareBox
          title="Micro 2: Grid Columns"
          yourWork={<Micro2GridColumns />}
          solution={<Micro2GridColumnsSolution />}
        />

        <CompareBox
          title="Mini: Product Grid"
          yourWork={<MiniProductGrid />}
          solution={<MiniProductGridSolution />}
          fullWidth
        />

        <CompareBox
          title="Real: Header + Product Section"
          yourWork={<RealHeaderProductSection />}
          solution={<RealHeaderProductSectionSolution />}
          fullWidth
        />
      </div>
    </div>
  );
}

// ============================================
// SESSION 1.5.3 COMPONENT
// ============================================
function Session153() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Session 1.5.3 - Responsive Design
          </h1>
          <p className="text-gray-600">Topics: Mobile-First, Breakpoints, Show/Hide, Responsive Layouts</p>
          <p className="text-sm text-gray-500 mt-2">
            💡 Resize browser để xem responsive behavior. So sánh Your Work với Solution.
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-black text-white text-xs rounded">
            <span className="sm:hidden">Mobile</span>
            <span className="hidden sm:inline md:hidden">SM (640px+)</span>
            <span className="hidden md:inline lg:hidden">MD (768px+)</span>
            <span className="hidden lg:inline xl:hidden">LG (1024px+)</span>
            <span className="hidden xl:inline">XL (1280px+)</span>
          </div>
        </header>

        <CompareBox
          title="Micro 1: Responsive Text"
          yourWork={<Micro1ResponsiveText />}
          solution={<Micro1ResponsiveTextSolution />}
          fullWidth
        />

        <CompareBox
          title="Micro 2: Show/Hide Pattern"
          yourWork={<Micro2ShowHide />}
          solution={<Micro2ShowHideSolution />}
          fullWidth
        />

        <CompareBox
          title="Mini: Responsive ProductCard"
          yourWork={<MiniResponsiveCard />}
          solution={<MiniResponsiveCardSolution />}
          fullWidth
        />

        <CompareBox
          title="Real: Responsive E-commerce Homepage"
          yourWork={<RealResponsiveHomepage />}
          solution={<RealResponsiveHomepageSolution />}
          fullWidth
        />
      </div>
    </div>
  );
}

// ============================================
// SESSION 1.5.4 COMPONENT
// ============================================
function Session154() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Session 1.5.4 - States & Interactivity
          </h1>
          <p className="text-gray-600">Topics: Hover, Focus, Active, Group, Peer, Transitions</p>
          <p className="text-sm text-gray-500 mt-2">
            💡 Tương tác với các elements để xem effects. So sánh Your Work với Solution.
          </p>
        </header>

        <CompareBox
          title="Micro 1: Hover Button"
          yourWork={<Micro1HoverButton />}
          solution={<Micro1HoverButtonSolution />}
        />

        <CompareBox
          title="Micro 2: Focus Input"
          yourWork={<Micro2FocusInput />}
          solution={<Micro2FocusInputSolution />}
        />

        <CompareBox
          title="Mini: Interactive ProductCard"
          yourWork={<MiniInteractiveCard />}
          solution={<MiniInteractiveCardSolution />}
        />

        <CompareBox
          title="Real: Full E-commerce Interactivity"
          yourWork={<RealFullInteractivity />}
          solution={<RealFullInteractivitySolution />}
          fullWidth
        />
      </div>
    </div>
  );
}

// ============================================
// SESSION 1.5.5 COMPONENT
// ============================================
function Session155() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Session 1.5.5 - Custom Configuration & Design System
          </h1>
          <p className="text-gray-600">Topics: @theme, @apply, @layer, Design Tokens, Component Classes</p>
          <p className="text-sm text-gray-500 mt-2">
            Tạo design system với Tailwind v4: custom colors, button classes, input fields
          </p>
          <div className="mt-3 flex gap-2">
            <span className="badge-brand">Tailwind v4</span>
            <span className="badge-success">Green Theme</span>
          </div>
        </header>

        <CompareBox
          title="Micro 1: Custom Color với @theme"
          yourWork={<Micro1CustomColor />}
          solution={<Micro1CustomColorSolution />}
          fullWidth
        />

        <CompareBox
          title="Micro 2: @apply Directive"
          yourWork={<Micro2ApplyDirective />}
          solution={<Micro2ApplyDirectiveSolution />}
          fullWidth
        />

        <CompareBox
          title="Mini: Design Tokens System"
          yourWork={<MiniDesignTokens />}
          solution={<MiniDesignTokensSolution />}
          fullWidth
        />

        <CompareBox
          title="Real: Refactor E-commerce với Design System"
          yourWork={<RealRefactorDesignSystem />}
          solution={<RealRefactorDesignSystemSolution />}
          fullWidth
        />
      </div>
    </div>
  );
}

// ============================================
// SESSION 1.5.6 COMPONENT
// ============================================
function Session156() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Session 1.5.6 - Headless UI & Production
          </h1>
          <p className="text-gray-600">Topics: Headless UI, CVA, cn() helper, Production Optimization</p>
          <p className="text-sm text-gray-500 mt-2">
            Xây dựng production-ready components với accessible UI và type-safe variants
          </p>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 bg-brand-500 text-white text-xs rounded">Headless UI</span>
            <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded">CVA</span>
            <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">Production</span>
          </div>
        </header>

        <CompareBox
          title="Micro 1: CVA Button Variants"
          yourWork={<Micro1CVAButton />}
          solution={<Micro1CVAButtonSolution />}
          fullWidth
        />

        <CompareBox
          title="Micro 2: cn() Helper Function"
          yourWork={<Micro2CNHelper />}
          solution={<Micro2CNHelperSolution />}
          fullWidth
        />

        <CompareBox
          title="Mini: Quick View Modal (Headless UI)"
          yourWork={<MiniModal />}
          solution={<MiniModalSolution />}
          fullWidth
        />

        <CompareBox
          title="Real: Complete E-commerce với Headless UI"
          yourWork={<RealEcommerce />}
          solution={<RealEcommerceSolution />}
          fullWidth
                />
      </div>
    </div>
  );
}

// ============================================
// SESSION 1.5.R COMPONENT - Review & Polish
// ============================================
function Session15R() {
  const [currentChallenge, setCurrentChallenge] = React.useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Session 1.5.R - Review & Polish
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Quick Challenges: Rebuild, Create, Debug
          </p>

          {/* Challenge Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentChallenge(1)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentChallenge === 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Challenge 1: ProductCard
            </button>
            <button
              onClick={() => setCurrentChallenge(2)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentChallenge === 2
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Challenge 2: Testimonial
            </button>
            <button
              onClick={() => setCurrentChallenge(3)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentChallenge === 3
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Challenge 3: Debug
            </button>
          </div>
        </div>
      </header>

      {/* Challenge Content */}
      <main>
        {currentChallenge === 1 && <Challenge1Demo />}
        {currentChallenge === 2 && <Challenge2Demo />}
        {currentChallenge === 3 && <Challenge3Demo />}
      </main>
    </div>
  );
}

export default App;
