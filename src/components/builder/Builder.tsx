import { useBuilder } from "../../context/BuilderContext";
import { AccordionStep } from "../accordion/AccordionStep";
import { ProductCard } from "../product/ProductCard";
import { steps } from "../../data/steps";
import { useResponsive } from "../../hooks/useResponsive";

export function Builder() {
  const { state, actions } = useBuilder();
  const { isMobile } = useResponsive();
  const { currentStep, stepProducts, selectedItems } = state;

  const getStepSelectedCount = (stepId: number) => {
    const stepCategory = steps.find((s) => s.id === stepId)?.category;
    if (!stepCategory) return 0;

    return selectedItems.filter((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      return product?.category === stepCategory && item.quantity > 0;
    }).length;
  };
  console.log("products", state?.products);

  const handleNextStep = () => {
    actions.nextStep();
  };

  return (
    <div className="bg-paper space-4 rounded-10">
      {/* Steps */}
      <div className="bg-transparent p-4">
        {steps.map((step, index) => {
          const products = stepProducts[step.id] || [];
          const isOpen = currentStep === step.id;
          const selectedCount = getStepSelectedCount(step.id);

          return (
            <>
              <span
                className="font-gilroy-semibold text-text-title"
                style={{
                  fontFamily: "Gilroy-Medium, sans-serif",
                  fontWeight: 400,
                  fontSize: isMobile ? "10px" : "12px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                  color: "#484848",
                  background: "#0B0D10",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                STEP {index + 1} OF {steps.length}
              </span>

              <AccordionStep
                key={step.id}
                stepNumber={index + 1}
                totalSteps={steps.length}
                title={step.title}
                category={step.category}
                isOpen={isOpen}
                selectedCount={selectedCount}
                totalItems={products.length}
                onToggle={() => actions.goToStep(step.id)} //TODO: update to toggle not just open
                onNext={index < steps.length - 1 ? handleNextStep : undefined}
              >
                <div className="grid grid-cols-2  gap-4   ">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      selectedItems={selectedItems}
                      onVariantSelect={(variantId) =>
                        actions.selectVariant(product.id, variantId)
                      }
                      onQuantityChange={(variantId, quantity) =>
                        actions.updateQuantity(product.id, variantId, quantity)
                      }
                    />
                  ))}
                </div>
              </AccordionStep>
            </>
          );
        })}
      </div>
    </div>
  );
}
