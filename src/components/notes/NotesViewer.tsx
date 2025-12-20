import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Download,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Target,
  FileText,
  Beaker,
  GraduationCap,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import { klbNotes, TopicNotes, SubtopicNote } from "@/data/klbNotes";
import { toast } from "sonner";

interface NotesViewerProps {
  subject: "chemistry" | "physics";
  form: number;
}

const NotesViewer = ({ subject, form }: NotesViewerProps) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicNotes | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubtopicNote | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const formKey = `form${form}` as keyof typeof klbNotes.chemistry;
  const notes = subject === "chemistry" 
    ? klbNotes.chemistry[formKey] 
    : klbNotes.physics[formKey];

  if (!notes) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Notes for {subject} Form {form} are coming soon!
        </p>
      </Card>
    );
  }

  const toggleTopic = (title: string) => {
    setExpandedTopics(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const downloadNotes = () => {
    if (!selectedTopic) return;

    let content = `# ${selectedTopic.title}\n\n`;
    content += `## Introduction\n${selectedTopic.introduction}\n\n`;
    
    selectedTopic.subtopics.forEach((sub, idx) => {
      content += `## ${idx + 1}. ${sub.title}\n\n`;
      content += `${sub.content}\n\n`;
      content += `### Key Points:\n`;
      sub.keyPoints.forEach(point => {
        content += `- ${point}\n`;
      });
      if (sub.formulas && sub.formulas.length > 0) {
        content += `\n### Formulas:\n`;
        sub.formulas.forEach(f => {
          content += `- ${f}\n`;
        });
      }
      if (sub.examples && sub.examples.length > 0) {
        content += `\n### Examples:\n`;
        sub.examples.forEach(e => {
          content += `- ${e}\n`;
        });
      }
      content += `\n`;
    });

    content += `## Summary\n${selectedTopic.summary}\n\n`;
    
    if (selectedTopic.examTips) {
      content += `## Exam Tips:\n`;
      selectedTopic.examTips.forEach(tip => {
        content += `- ${tip}\n`;
      });
    }

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject}-form${form}-${selectedTopic.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Notes downloaded successfully!");
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Topic List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="w-5 h-5 text-accent" />
              {notes.subject} - {notes.form}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {notes.topics.map((topic, idx) => (
                  <div key={idx} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        toggleTopic(topic.title);
                        setSelectedTopic(topic);
                        setSelectedSubtopic(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
                        selectedTopic?.title === topic.title
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium text-sm">{topic.title}</span>
                      </div>
                      {expandedTopics[topic.title] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {expandedTopics[topic.title] && (
                      <div className="border-t bg-secondary/30 p-2 space-y-1">
                        {topic.subtopics.map((sub, subIdx) => (
                          <button
                            key={subIdx}
                            onClick={() => {
                              setSelectedTopic(topic);
                              setSelectedSubtopic(sub);
                            }}
                            className={`w-full text-left p-2 text-sm rounded transition-colors ${
                              selectedSubtopic?.title === sub.title
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-secondary"
                            }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Notes Content */}
      <div className="lg:col-span-2">
        {selectedTopic ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="mb-2">{notes.form}</Badge>
                  <CardTitle>{selectedTopic.title}</CardTitle>
                </div>
                <Button onClick={downloadNotes} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedSubtopic ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3">{selectedSubtopic.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedSubtopic.content}</p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-primary" />
                      Key Points
                    </h4>
                    <ul className="space-y-2">
                      {selectedSubtopic.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedSubtopic.formulas && selectedSubtopic.formulas.length > 0 && (
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Calculator className="w-4 h-4 text-accent" />
                        Formulas
                      </h4>
                      <div className="space-y-2">
                        {selectedSubtopic.formulas.map((formula, idx) => (
                          <div key={idx} className="p-2 bg-background rounded font-mono text-sm">
                            {formula}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubtopic.examples && selectedSubtopic.examples.length > 0 && (
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Examples
                      </h4>
                      <ul className="space-y-2">
                        {selectedSubtopic.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => setSelectedSubtopic(null)}
                    className="w-full"
                  >
                    ← Back to Topic Overview
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Introduction</h4>
                    <p className="text-muted-foreground">{selectedTopic.introduction}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Subtopics</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedTopic.subtopics.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSubtopic(sub)}
                          className="p-4 bg-secondary/50 hover:bg-secondary rounded-lg text-left transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-accent" />
                            <span className="font-medium text-sm">{sub.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {sub.content.substring(0, 100)}...
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <p className="text-muted-foreground text-sm">{selectedTopic.summary}</p>
                  </div>

                  {selectedTopic.examTips && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Exam Tips
                      </h4>
                      <ul className="space-y-1">
                        {selectedTopic.examTips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedTopic.practicalActivities && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Beaker className="w-4 h-4 text-green-500" />
                        Practical Activities
                      </h4>
                      <ul className="space-y-1">
                        {selectedTopic.practicalActivities.map((activity, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Select a topic from the list to view comprehensive notes
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotesViewer;
